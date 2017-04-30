//try to auth by bearer
//try to auth by username as password
const url = require("url");

module.exports = (User, passport, helpers, app) => {

    let options = {
        findUserByEmail: (email) => {
            return User.findOne({
                email: email
            });
        },
        findUserByToken: (token) => {
            return User.findOne({
                token: token
            });
        },
        validateUserPassword: (user, password) => {
            return user.validatePassword(password);
        }
    };


    const _options = {
        loginUrl: '/login',
        rootUrl: '/',
        loginView: 'sessions/new',
        unauthenticatedPaths: [
            '/login',
            '/logout',
            '/sessions',
            '/user/new',
            '/users'
        ]
    };

    // Register options
    for (let key in options) {
        _options[key] = options[key];
    }



    //start passport service and session
    app.use(passport.intialize());
    app.use(passport.session());
    //if user is already logged in then req.user should be set
    //-------------------
    //Set res.locals.currentUser for access in templates
    //-------------------
    app.use((req, res, next) => {
        if (req.user) res.locals.currentUser = req.user;
    });

    //if trying to access api path, check for token
    app.use('/api', function(req, res, next) {
        let token = req.query.token || req.body.token;
        if (!token) {
            res.status(401).json({
                error: "Unauthorized"
            });
            return;
        }
        User.findByToken(token)
            .then((user) => {
                if (!user) {
                    //custom error page or flash message
                    return next(new Error("No user by that token"));
                }
                req.user = user;
                next();
            });

    });


    // ----------------------------------------
    // Require Login/Logout
    // ----------------------------------------
    app.use((req, res, next) => {
        const reqUrl = url.parse(req.url).pathname;

        // Is the user logged in?
        const isLoggedIn = !!req.user;

        // Is this an authenticated route?
        const isAuthenticatedPath = !_options
            .unauthenticatedPaths
            .includes(reqUrl);

        // User can proceed if
        const canProceed =
            // They are logged in and route
            // is authenticated or
            (isLoggedIn && isAuthenticatedPath) ||

            // The path is unauthenticated
            !isAuthenticatedPath;

        // Redirect if cannot proceed
        canProceed ? next() : res.redirect(_options.loginUrl);
    });


    // ----------------------------------------
    // New
    // ----------------------------------------
    const onNew = (req, res) => {

        // Redirect to root if already logged in
        req.user ?
            res.redirect(_options.rootUrl) :
            res.render(_options.loginView);
    };
    app.get('/login', onNew);
    app.get('/sessions/new', onNew);



    //Shorten helpers for use in auth and routers
    const h = helpers.registered;

    //define strategy for login with local auth
    let newSessionStrat = passport.authenticate("local", {
        successRedirect: h.homePath(),
        failureRedirect: h.loginPath()
    });
    // ----------------------------------------
    // Create
    // ----------------------------------------
    app.post('/sessions/new', newSessionStrat);


    // ----------------------------------------
    // Destroy
    // ----------------------------------------
    const onDestroy = (req, res) => {
        // Delete all keys and
        // redirect
        for (let key in req.session) {
            delete req.session[key];
        }
        req.method = 'GET';
        res.redirect(_options.loginUrl);
    };
    app.get('/logout', onDestroy);
    app.delete('/logout', onDestroy);
    app.delete('/sessions', onDestroy);

};
