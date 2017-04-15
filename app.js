const express = require("express");
//const fetch = require("isomorphic-fetch");

const TwitterWrapper = require('./lib/twitter_wrapper');
const twit = new TwitterWrapper(require('./configtwit.json'));


twit.sendPrediction("It's gonna rain!").then(response => {
    if (typeof response === 'string') {
        console.error(response);
    }
    else {
        console.log(`Response from twitter API ${ response.data } and ${ response.response }`);
    }

});
