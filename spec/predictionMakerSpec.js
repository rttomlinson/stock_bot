const {
  predictionMaker,
  callAlgorithim
} = require("../lib/predictionMaker");

describe("prediction Maker", function() {
  describe("a call to prediction maker", function() {
    it("check if method returns a string", function() {
      expect(typeof predictionMaker()).toEqual("string");
    });
    it("comes back in the form of Prediction for today at time: {name} is going to go (up/down)", function() {
      let time = new Date(Date.now()).toDateString();
      let prediction = `Prediction for today ${ time }: Apple stocks are going up.`;
      console.log(prediction);
      expect(predictionMaker('Apple')).toEqual(prediction)
    });

  });
  describe("a call to callAlgorithim", function() {
    it("check if method returns up or down", function() {
      expect(/up|down/.test(callAlgorithim())).toEqual(true);
    });
  });
});
