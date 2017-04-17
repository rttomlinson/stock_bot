const DelayTimer = require('../lib/delayTimer');
const delayTimer = new DelayTimer();
describe("time to delay calculation", function() {
    describe("can accept a time in the future and tell the user how long until that time", function() {

        it("empty arguments returns 0", function() {

            expect(delayTimer.timeUntilInvocation( /*Future date*/ )).toBe(0);
        });
        it("accepts a datestring 000000 and returns", function() {
            expect(delayTimer.timeUntilInvocation("000000")).toEqual(0);
        });
        it("accepts a datestring 235959 and returns", function() {
            expect(delayTimer.timeUntilInvocation("235959")).toEqual(0);
        });
        it("accepts a datestring 073000 and returns", function() {
            expect(delayTimer.timeUntilInvocation("073000")).toEqual(0);
        });
    });
    describe("datAtZero helper function", function() {
        it("get current day at zeroth hour", function() {
            let todayZero = new Date(Date.now());
            let paramsZero = new Date(Date.now());
            todayZero.setHours(0, 0, 0, 0);
            expect(delayTimer.dayAtZero(paramsZero)).toEqual(todayZero);
        });
        it("get Dec 25, 1995 at zeroth hour", function() {
            let todayZero = new Date("Mon, 25 Dec 1995 13:30:00");
            let paramsZero = new Date("Mon, 25 Dec 1995 00:00:00");
            todayZero.setHours(0, 0, 0, 0);
            expect(delayTimer.dayAtZero(paramsZero)).toEqual(todayZero);
        });
    });
    describe("timePassed for current day function", function() {

        beforeEach(function() {
            this.todayZero = new Date(Date.now());
            this.todayZero.setHours(0, 0, 0, 0);
        })
        it("return false is the desired time has not passed", function() {
            let futureTime = new Date(Date.now() + 10000);
            expect(delayTimer.hasTimePassed(futureTime)).toBe(false);
        })
        it("return true is the desired time has passed", function() {
            let pastTime = new Date(Date.now() - 10000);
            expect(delayTimer.hasTimePassed(pastTime)).toBe(true);
        })
    })
    describe("timeUntilInovocation function", function() {
        it("returns 0 for empty arguments", function() {
            expect(delayTimer.timeUntilInvocation()).toBe(0);
        });
        it("returns -1 for string of numbers greater than 6", function() {
            expect(delayTimer.timeUntilInvocation("1234567")).toBe(-1);
        });
        it("returns -1 for string of numbers greater than 6", function() {
            expect(delayTimer.timeUntilInvocation("1234567")).toBe(-1);
        });

    })
    describe("timeStringValidator function", function() {
        it("returns true for empty arguments", function() {
            expect(delayTimer.timeStringValidator()).toBe(true);
        });
        it("returns false for string of numbers greater than 6", function() {
            expect(delayTimer.timeStringValidator("1234567")).toBe(false);
        });
        it("returns true for string 111111", function() {
            expect(delayTimer.timeStringValidator("111111")).toBe(true);
        });
        it("returns true for string 121121", function() {
            expect(delayTimer.timeStringValidator("121121")).toBe(true);
        });
        it("returns true for string 191111", function() {
            expect(delayTimer.timeStringValidator("191111")).toBe(true);
        });
        it("returns false for string 241191", function() {
            expect(delayTimer.timeStringValidator("241191")).toBe(false);
        });
        it("returns false for string 251191", function() {
            expect(delayTimer.timeStringValidator("251191")).toBe(false);
        });
        it("returns true for string 241119", function() {
            expect(delayTimer.timeStringValidator("241119")).toBe(false);
        });
        it("returns true for string 231119", function() {
            expect(delayTimer.timeStringValidator("231119")).toBe(true);
        });
        it("returns true for string 23$119", function() {
            expect(delayTimer.timeStringValidator("23$119")).toBe(false);
        });
    })
    describe("timeStringToMilliseconds function", function() {
        it("returns 0 for 000000", function() {
            expect(delayTimer.timeStringToMilliseconds("000000")).toBe(0);
        });
        it("returns 0 for 000100", function() {
            expect(delayTimer.timeStringToMilliseconds("000100")).toBe(60000);
        });
        it("returns 0 for 200000", function() {
            expect(delayTimer.timeStringToMilliseconds("200000")).toBe(72000000);
        });
        it("returns 0 for 012359", function() {
            expect(delayTimer.timeStringToMilliseconds("012359")).toBe(5039000);
        });
    });
    xdescribe("getTomorrowAtMidnight function", function() {
        it("returns 0 for 000000", function() {
            expect(delayTimer.timeStringToMilliseconds("000000")).toBe(0);
        });
    });
});
