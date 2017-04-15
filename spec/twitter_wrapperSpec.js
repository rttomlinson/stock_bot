"use strict";

const TwitterWrapper = require('../lib/twitter_wrapper');


describe(".sendPrediction method", function() {
    let tweet;
    
    beforeEach(function() {
        tweet = new TwitterWrapper();
    })
    
    it("return as a Promise", function(done) {
        tweet.sendPrediction().then((response) => {
            expect(true).toBe(true);
            done();
        });
    });
    
    
})


