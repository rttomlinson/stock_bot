const coinToss = require("../lib/coinToss");

class PredictionMaker {

    constructor(callAlgorithim) {
        this.callAlgorithim = callAlgorithim || defaultCallAlgorithim;
    }

    getPrediction(stockName) {
        let time = new Date(Date.now()).toDateString();
        let prediction = this.callAlgorithim();
        let predictionObj = {
            time: time,
            prediction: prediction,
            company: stockName
        };
        return predictionObj;
    }
}

// function predictionMaker(stockName) {
//     let time = new Date(Date.now()).toDateString();
//     let prediction = "up";
//     let predictionObj = {
//         time: time,
//         prediction: prediction,
//         company: stockName
//     };
//     return predictionObj;
// }

function defaultCallAlgorithim() {
    return "up";
}
module.exports = PredictionMaker;

// `Prediction for today ${time}: ${stock} stocks are going up.`;
