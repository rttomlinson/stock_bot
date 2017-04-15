const express = require("express");

//const fetch = require("isomorphic-fetch");

const TwitterWrapper = require("./lib/twitter_wrapper");
const twit = new TwitterWrapper(require("./configtwit.json"));

////************* Prediction Maker Module ********////
const PredictionMaker = require('./lib/predictionMaker');
const predictionMaker = new PredictionMaker();
//////////*******Prediction Formatter*********//////////////////////
const predictionFormatter = require('./lib/predictionFormatter');
///////////////*****************//////////////////////

//get a prediction
async function tweetPrediction() {
    let predictionObj = await predictionMaker.getPrediction('Apple')
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

//format it
let i = 0;
while ()
