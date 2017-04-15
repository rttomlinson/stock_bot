const PredictionMaker = require("../lib/predictionMaker");
console.log(typeof PredictionMaker);
let time;
let predictionMaker;
describe("prediction Maker", function() {
  describe("a call to prediction maker", function() {
    beforeEach(function() {
      time = new Date(Date.now()).toDateString();
      predictionMaker = new PredictionMaker();
    });
    it("check if method returns a prediction object", done => {
      predictionMaker.getPrediction().then(prediction => {
        expect(typeof prediction).toEqual("object");
        expect(prediction).not.toBeNull();
        done();
      });
    });
    it("takes a company and returns a company property on the prediction object ", done => {
      predictionMaker.getPrediction("Apple").then(prediction => {
        expect(prediction.company).toBe("Apple");
        done();
      });
    });
    it("takes a company with multiple words and returns the company property on the prediction object ", done => {
      predictionMaker.getPrediction("Take 2 Interactive").then(prediction => {
        expect(prediction.company).toBe("Take 2 Interactive");
        done();
      });
    });
    it("returns on object with prediction property", done => {
      predictionMaker.getPrediction("Take 2 Interactive").then(prediction => {
        expect(prediction.prediction).toBeDefined();
        done();
      });
    });
    it("returns on object with prediction property of 1 or 0", done => {
      predictionMaker.getPrediction("Take 2 Interactive").then(prediction => {
        expect(prediction.prediction).toBeLessThan(2);
        expect(prediction.prediction).toBeGreaterThan(-1);
        expect(Number.isInteger(prediction.prediction)).toEqual(true);
        done();
      });
    });
    it("returns on object with time property", done => {
      predictionMaker.getPrediction("Take 2 Interactive").then(prediction => {
        expect(prediction.time).toBeDefined();
        done();
      });
    });
    it("returns on object with time of prediction creation", done => {
      predictionMaker.getPrediction("Take 2 Interactive").then(prediction => {
        expect(prediction.time).toBe(time);
        done();
      });
    });
    it("returns on object with prediction time as a string", done => {
      predictionMaker.getPrediction("Take 2 Interactive").then(prediction => {
        expect(typeof prediction.time).toBe("string");
        done();
      });
    });

    it("calls the callAlgorithim function", function() {
      this.callAlgorithim = {
        callAlgorithim: function() {}
      };
      spyOn(this.callAlgorithim, "callAlgorithim");
      predictionMaker = new PredictionMaker(this.callAlgorithim.callAlgorithim);
      predictionMaker.getPrediction("Bananas");
      expect(this.callAlgorithim.callAlgorithim).toHaveBeenCalled();
    });
  });
});

// xdescribe("prediction formatter", function() {
//   xit("returns a formatter prediction as a string", function() {
//     let prediction = `Prediction for today ${time}: Apple stocks are going up.`;
//     let predictionObj = predictionMaker.getPrediction("Apple");
//     expect(predictionObj.prediction).toBe(prediction);
//   });
//   xit("returns up or down at the end of the prediction", function() {
//     expect(/.+up\.$|down\.$/.test(predictionMaker.getPrediction())).toEqual(true);
//   });
// });
