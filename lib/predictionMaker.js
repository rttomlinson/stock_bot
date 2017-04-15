const coinToss = require("../lib/coinToss");

function predictionMaker(stock) {
    let time = new Date(Date.now()).toDateString();
    let prediction = `Prediction for today ${ time }: ${ stock } stocks are going up.`
    return prediction;
}

function callAlgorithim() {
    return "up";
}
module.exports = {
    predictionMaker,
    callAlgorithim
};
