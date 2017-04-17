const express = require("express");

//const fetch = require("isomorphic-fetch");

const TwitterWrapper = require("./lib/twitter_wrapper");
const twit = new TwitterWrapper({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

////************* Prediction Maker Module ********////
const PredictionMaker = require("./lib/predictionMaker");
const predictionMaker = new PredictionMaker();
//////////*******Prediction Formatter*********//////////////////////
const predictionFormatter = require("./lib/predictionFormatter");
///////////////*****delayTimer************//////////////////////
const DelayTimer = require("./lib/delayTimer");
const delayTimer = new DelayTimer();
//get a prediction
async function tweetPrediction() {
    let predictionObj = await predictionMaker.getPrediction("Apple");
    let predictionString = predictionFormatter(predictionObj);
    twit.sendPrediction(predictionString).then(response => {
        if (typeof response === "string") {
            console.error(response);
        }
        else {
            console.log(`Response from twitter API ${response.data}`);
        }
    });
}

setTimeout(function() {
    setInterval(tweetPrediction, 86400000);
}, delayTimer.timeUntilInovocation("073000"));


//WRITE A TEST LATER DONT BE LAZY - FOR MARK
//////////*******Runs multiple tweets locally*********//////////////////////
// let i = 0;
// while (i < 2) {
//   console.log("tweeting");
//   setTimeout(tweetPrediction, 20000 * i);
//   i++;
// }
