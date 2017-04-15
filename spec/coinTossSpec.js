const coinToss = require("../lib/coinToss");

describe("check coinToss returns 0 or 1", function() {
  it("check if method returns a number", function() {
    expect(coinToss()).toBeLessThan(2);
    expect(coinToss()).toBeGreaterThan(-1);
    expect(Number.isInteger(coinToss())).toEqual(true);
  });
});
