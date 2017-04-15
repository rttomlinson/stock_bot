function predictionFormatter(predictionObj) {

    //Modifies value at prediction property
    _predictionConverter(predictionObj);

    return `Prediction for today ${predictionObj.time}: ${ predictionObj.company } stocks are going ${ predictionObj.prediction }.`;
}


/** Changes the value at predictionObj.prediction 
 * If value is 0 --> "down" {string}
 * If value is 1 --> "up" {string}
 **/
function _predictionConverter(predictionObj) {
    if (predictionObj.prediction) {
        predictionObj.prediction = "up";
    }
    else {
        predictionObj.prediction = "down";
    }
}



module.exports = predictionFormatter;
