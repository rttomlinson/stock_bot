//try to auth by bearer
//try to auth by username as password

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


//define strategy for login with local auth
let newSessionStrat = passport.authenticate("local", {
    successRedirect: h.homePath(),
    failureRedirect: h.loginPath()
});

app.post('/sessions/new', newSessionStrat);











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


// ----------------------------------------
// Create
// ----------------------------------------
app.post('/sessions', (req, res, next) => {

    // Look for the user
    // to log in
    const {
        email,
        password
    } = req.body;

    // Use the function provided in
    // the options
    _options.findUserByEmail(email)
        .then((user) => {
            // If we have a user
            if (user) {

                // Again using a function
                // from the options
                // If password is valid
                if (_options.validateUserPassword(user, password)) {

                    // Sign in user
                    const sessionId = SessionService.createSignedSessionId(user.email);
                    req.session.sessionId = sessionId;
                    res.redirect(_options.rootUrl);
                }
                else {

                    // Bad password
                    req.flash('error', 'Invalid password');
                    res.redirect(_options.loginUrl);
                }
            }
            else {

                // Redirect to login
                req.flash('error', 'User not email not found!');
                res.redirect(_options.loginUrl);
            }
        })
        .catch(next);
});


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




module.exports = (options) => {
    // Register options
    for (let key in options) {
        _options[key] = options[key];
    }

    return app;
};
