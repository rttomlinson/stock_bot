"use strict";
const twit = require("twit");
//posting twitter
class TwitterWrapper {
  constructor() {}

  checkLength(str) {
    if (typeof str !== "string") {
      return false;
    } else if (str.length > 140) {
      return false;
    }
    return true;
  }

  //sendPrediction;
}

module.exports = TwitterWrapper;
