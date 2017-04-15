const coinToss = require("../lib/coinToss");

function predictionMaker(stockName) {
  let time = new Date(Date.now()).toDateString();
  let prediction = "up";
  let predictionObj = {
    time: time,
    prediction: prediction,
    company: stockName
  };
  return predictionObj;
}

function callAlgorithim() {
  return "up";
}
module.exports = {
  predictionMaker,
  callAlgorithim
};

// `Prediction for today ${time}: ${stock} stocks are going up.`;
