"use strict";

const TwitterWrapper = require("../lib/twitter_wrapper");

describe(".sendPrediction method", function() {
  let tweet;

  beforeEach(function() {
    tweet = new TwitterWrapper();
  });

  it("return an a error if no string is passed", function() {
    expect(tweet.checkLength()).toEqual(false);
  });
  it("return error if string length is greater than 140", function() {
    let longStr = "fffasdkjfhlaksdfnalksjdfh;asdfjhlkjahsdkfjhalksjdfhlakjshdflkajshdflkjashdflkjasdfhlkajsdhflkjashdflkajshdflkjashdflkjahsdlfkjhasdlfkjhaslkdjfhalskjdfhalksjdfhlakjsdfhakjlsdhfkajsdhfkjadsfhalksdhjfasfl;kasjflaksdjf;liekjasdkl;fjakls;fdjakl;sdfjal;skdfjal;skdfjal;ksjdfal;ksdfjal;ksdfjal;skdfjal;ksdjfals;kj";
    expect(tweet.checkLength(longStr)).toEqual(false);
  });
  it("expect .checkLength when called with str less than 140 chars and greater than zero to respond with 'success'", function() {
    let goodStr = "Hello";
    expect(tweet.checkLength(goodStr)).toEqual(true);
  });
});
