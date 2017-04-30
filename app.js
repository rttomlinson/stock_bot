const express = require("express");
const app = express();
const wagner = require("wagner-core");

const helpers = require('./helpers');
wagner.factory("helpers", function() {
    return helpers;
});

require("./models/sequelize/")(wagner);
//get passport
require("./services/passport")(wagner);




// ----------------------------------------
// Body Parser
// ----------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

//--------------------
//Express session
//--------------------
const expressSession = require("express-session");
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {}
}));

// ----------------------------------------
// Flash Messages
// ----------------------------------------
const flash = require('express-flash-messages');
app.use(flash());


// ----------------------------------------
// Method Override
// ----------------------------------------
app.use((req, res, next) => {
    let method;
    if (req.query._method) {
        method = req.query._method;
        delete req.query._method;
        for (let key in req.query) {
            req.body[key] = decodeURIComponent(req.query[key]);
        }
    }
    else if (typeof req.body === 'object' && req.body._method) {
        method = req.body._method;
        delete req.body._method;
    }

    if (method) {
        method = method.toUpperCase();
        req.method = method;
    }

    next();
});
// ----------------------------------------
// Referrer
// ----------------------------------------
app.use((req, res, next) => {
    req.session.backUrl = req.header('Referer') || '/';
    next();
});


// ----------------------------------------
// Public
// ----------------------------------------
app.use(express.static(`${ __dirname }/public`));


// ----------------------------------------
// Template Engine
// ----------------------------------------
const expressHandlebars = require('express-handlebars');

const hbs = expressHandlebars.create({
    helpers: helpers.registered,
    partialsDir: 'views/',
    defaultLayout: 'main'
});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// ----------------------------------------
// Services
// ----------------------------------------
wagner.invoke(require('./services/auth'), {
    app: app
});


//Shorten helpers for use in auth and routers
const h = helpers.registered;

let forLoggedOut = function(req, res, next) {
    if (req.user) {
        return res.redirect('/');
    }
    next();
};
let forLoggedIn = function(req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
};

app.get(h.loginPath(), function(req, res, next) {
    res.render("sessions/new");
});

//Be aware that the home path is located in the users_helper file
app.get('/', function(req, res, next) {
    res.redirect(h.homePath());
});
app.get(h.homePath(), function(req, res, next) {

    res.render("users/show");
});

app.get(h.newUserPath(), function(req, res, next) {
    res.render('users/new');
});

const User = require("./models/sequelize").User;
app.post(h.newUserPath(), function(req, res, next) {
    const userParams = {
        email: req.body.user.email,
        password: req.body.user.password
    };
    User.create(userParams)
        .then(user => {
            req.login(user, err => {
                return err ? next(err) : res.redirect('/');
            });
        })
        .catch(next);
});







// ----------------------------------------
// Server
// ----------------------------------------
const port = process.env.PORT ||
    process.argv[2] ||
    3000;
const host = 'localhost';


let args;
process.env.NODE_ENV === 'production' ?
    args = [port] :
    args = [port];

args.push(() => {
    console.log(`Listening: http://${ host }:${ port }\n`);
});


// If we're running this file directly
// start up the server
if (require.main === module) {
    app.listen.apply(app, args);
}


// ----------------------------------------
// Error Handling
// ----------------------------------------
app.use('/api', (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err.stack) {
        err = err.stack;
    }
    res.status(500).json({
        error: err
    });
});


app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err.stack) {
        err = err.stack;
    }
    res.status(500).render('errors/500', {
        error: err
    });
});




module.exports = app;








// const TwitterWrapper = require("./lib/twitter_wrapper");
// const twit = new TwitterWrapper({
//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     access_token: process.env.TWITTER_ACCESS_TOKEN,
//     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });

// ////************* Prediction Maker Module ********////
// const PredictionMaker = require("./lib/predictionMaker");
// const predictionMaker = new PredictionMaker();
// //////////*******Prediction Formatter*********//////////////////////
// const predictionFormatter = require("./lib/predictionFormatter");
// ///////////////*****delayTimer************//////////////////////
// const DelayTimer = require("./lib/delayTimer");
// const delayTimer = new DelayTimer();



// // /////////////////Mongo DB//////////////////////////
// // var mongoose = require('mongoose');
// // app.use((req, res, next) => {
// //     if (mongoose.connection.readyState) {
// //         next();
// //     }
// //     else {
// //         require('./mongo')(req).then(() => next());
// //     }
// // });


// let predictionObj = await predictionMaker.getPrediction("Apple");
// ////////////////////////////
// //save prediction in the database
// ////////////////////////////






// //get a prediction
// async function tweetPrediction() {
//     let predictionObj = await predictionMaker.getPrediction("Apple");
//     let predictionString = predictionFormatter(predictionObj);
//     twit.sendPrediction(predictionString).then(response => {
//         if (typeof response === "string") {
//             console.error(response);
//         }
//         else {
//             console.log(`Response from twitter API ${response.data}`);
//         }
//     });
// };
// tweetPrediction();
// // setTimeout(function() {
// //     tweetPrediction();
// //     setInterval(tweetPrediction, 86400000);
// // }, delayTimer.timeUntilInovocation("043000"));


// //WRITE A TEST LATER DONT BE LAZY - FOR MARK
// //////////*******Runs multiple tweets locally*********//////////////////////
// // let i = 0;
// // while (i < 2) {
// //   console.log("tweeting");
// //   setTimeout(tweetPrediction, 20000 * i);
// //   i++;
// // }
