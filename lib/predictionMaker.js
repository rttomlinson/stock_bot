const coinToss = require("../lib/coinToss");

function predictionMaker(stockName) {
  let time = new Date(Date.now()).toDateString();
  let prediction = {company: stockName};
  return prediction;
}

function callAlgorithim() {
  return "up";
}
module.exports = {
  predictionMaker,
  callAlgorithim
};

// `Prediction for today ${time}: ${stock} stocks are going up.`;
