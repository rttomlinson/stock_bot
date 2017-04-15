"use strict";
const Twit = require("twit");
//posting twitter

class TwitterWrapper {
    constructor(configObj) {
        this.twit = Twit(configObj);
    }

    checkLength(str) {
        if (typeof str !== "string") {
            return false;
        }
        else if (str.length > 140) {
            return false;
        }
        return true;
    }

    async sendPrediction(str) {
        if (this.checkLength(str)) {
            let twitResponse = await this.twit.post('statuses/update', {
                status: str
            }, function(err, data, response) {
                if (err) {
                    return err;
                }
                return {
                    data,
                    response
                };
            });
            return twitResponse;
        }
        else {
            return "Error with passed in string";
        }
    }
}

module.exports = TwitterWrapper;
