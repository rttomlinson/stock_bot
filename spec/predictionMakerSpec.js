const predictionMaker = require("../lib/predictionMaker");

describe("a call to prediction maker", function() {
  it("check if method returns a string", function() {
    expect(typeof predictionMaker()).toEqual("string");
  });
});
