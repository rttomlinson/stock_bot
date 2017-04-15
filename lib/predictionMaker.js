const coinToss = require("../lib/coinToss");

class PredictionMaker {
  constructor(callAlgorithim) {
    this.callAlgorithim = callAlgorithim || this._defaultCallAlgorithim;
  }

  async getPrediction(stockName) {
    let time = new Date(Date.now()).toDateString();
    let prediction = await this.callAlgorithim();
    let predictionObj = {
      time: time,
      prediction: prediction,
      company: stockName
    };
    return predictionObj;
  }

  async _defaultCallAlgorithim() {
    let result = await coinToss();
    return result;
  }
}
module.exports = PredictionMaker;

// `Prediction for today ${time}: ${stock} stocks are going up.`;
