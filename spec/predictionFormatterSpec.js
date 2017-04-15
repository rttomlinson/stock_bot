const predictionFormatter = require("../lib/predictionFormatter");
let predictionObj;
let expectedString;
let time = new Date(Date.now()).toDateString();
describe("predictionFormatter Module", function() {
  it("returns down for 0 prediction", function() {
    predictionObj = {
      time: time,
      prediction: 0,
      company: "Apple"
    };
    expectedString = `Prediction for today ${time}: Apple stocks are going down.`;
    expect(predictionFormatter(predictionObj)).toBe(expectedString);
  });
  it("returns up for 1 prediction", function() {
    predictionObj = {
      time: time,
      prediction: 1,
      company: "Apple"
    };
    expectedString = `Prediction for today ${time}: Apple stocks are going up.`;
    expect(predictionFormatter(predictionObj)).toBe(expectedString);
  });
  it("returns up for 1 prediction and different name", function() {
    predictionObj = {
      time: time,
      prediction: 1,
      company: "Apple Pies"
    };
    expectedString = `Prediction for today ${time}: Apple Pies stocks are going up.`;
    expect(predictionFormatter(predictionObj)).toBe(expectedString);
  });
  it("returns up for 0 prediction and different name", function() {
    predictionObj = {
      time: time,
      prediction: 0,
      company: "Apple Pies"
    };
    expectedString = `Prediction for today ${time}: Apple Pies stocks are going down.`;
    expect(predictionFormatter(predictionObj)).toBe(expectedString);
  });
});
