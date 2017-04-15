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
      let predictionObj = predictionMaker("Take 2 Interactive");
      expect(predictionObj.company).toBe("Take 2 Interactive");
    });
    it("returns on object with prediction property", function() {
      let predictionObj = predictionMaker("Take 2 Interactive");
      expect(predictionObj.prediction).toBeDefined();
    });
    it("returns on object with prediction property of up or down", function() {
      let predictionObj = predictionMaker("Take 2 Interactive");
      expect(/^up$|^down$/.test(predictionObj.prediction)).toBe(true);
    });
    it("returns on object with time property", function() {
      let predictionObj = predictionMaker("Take 2 Interactive");
      expect(predictionObj.time).toBeDefined();
    });
    it("returns on object with time of prediction creation", function() {
      let predictionObj = predictionMaker("Take 2 Interactive");
      expect(predictionObj.time).toBe(time);
    });
    it("returns on object with prediction time as a string", function() {
      let predictionObj = predictionMaker("Take 2 Interactive");
      expect(typeof predictionObj.time).toBe("string");
    });

  });

  describe("a call to callAlgorithim", function() {
    it("check if method returns up or down", function() {
      expect(/^up$|^down$/.test(callAlgorithim())).toEqual(true);
    });
  });

});

// xdescribe("prediction formatter", function() {
//   xit("returns a formatter prediction as a string", function() {
//     let prediction = `Prediction for today ${time}: Apple stocks are going up.`;
//     let predictionObj = predictionMaker("Apple");
//     expect(predictionObj.prediction).toBe(prediction);
//   });
//   xit("returns up or down at the end of the prediction", function() {
//     expect(/.+up\.$|down\.$/.test(predictionMaker())).toEqual(true);
//   });
// });
