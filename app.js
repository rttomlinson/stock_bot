const express = require("express");

//const fetch = require("isomorphic-fetch");

const TwitterWrapper = require("./lib/twitter_wrapper");
const twit = new TwitterWrapper(require("./configtwit.json"));

////************* Prediction Maker Module ********////
const PredictionMaker = require("./lib/predictionMaker");
const predictionMaker = new PredictionMaker();
//////////*******Prediction Formatter*********//////////////////////
const predictionFormatter = require("./lib/predictionFormatter");
///////////////*****************//////////////////////

//get a prediction
async function tweetPrediction() {
  let predictionObj = await predictionMaker.getPrediction("Apple");
  let predictionString = predictionFormatter(predictionObj);
  twit.sendPrediction(predictionString).then(response => {
    if (typeof response === "string") {
      console.error(response);
    } else {
      console.log(`Response from twitter API ${response.data}`);
    }
  });
}

setInterval(tweetPrediction, 86400000);

//WRITE A TEST LATER DONT BE LAZY - FOR MARK
//////////*******Runs multiple tweets locally*********//////////////////////
// let i = 0;
// while (i < 2) {
//   console.log("tweeting");
//   setTimeout(tweetPrediction, 20000 * i);
//   i++;
// }
