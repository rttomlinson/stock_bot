const {
  predictionMaker,
  callAlgorithim
} = require("../lib/predictionMaker");
let time;
describe("prediction Maker", function() {
  describe("a call to prediction maker", function() {
    beforeEach(function() {
      time = new Date(Date.now()).toDateString();
    });
    it("check if method returns a prediction object", function() {
      expect(typeof predictionMaker()).toEqual("object");
      expect(predictionMaker()).not.toBeNull();
    });
    it("takes a company and returns a company property on the prediction object ", function() {
      let companyProperty = predictionMaker("Apple");
      expect(companyProperty.company).toBe("Apple");
    });
    it("takes a company with multiple words and returns the company property on the prediction object ", function() {
      let companyProperty = predictionMaker("My Mom's Dirty Socks");
      expect(companyProperty.company).toBe("My Mom's Dirty Socks");
    });
    it("returns a formatter prediction as a string", function() {
      let prediction = `Prediction for today ${time}: Apple stocks are going up.`;
      let companyProperty = predictionMaker("My Mom's Dirty Socks");
      expect(companyProperty.company).toBe("My Mom's Dirty Socks");
    });
    xit("returns up or down at the end of the prediction", function() {
      expect(/.+up\.$|down\.$/.test(predictionMaker())).toEqual(true);
    });
  });
  describe("a call to callAlgorithim", function() {
    it("check if method returns up or down", function() {
      expect(/up|down/.test(callAlgorithim())).toEqual(true);
    });
  });
});
