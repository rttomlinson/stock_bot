class DelayTimer {
    constructor() {
        let now = new Date();
        now.setHours(0, 0, 0, 0);
        this.todayAtMidnight = now;
    }

    timeUntilFuture() {
            return 0;
        }
        /** Zeros the date out back to midnight and returns the Date obj
         * @params dateObj {Date}
         * @return {Date}
         * 
         * */
    dayAtZero(dateObj) {
            dateObj.setHours(0, 0, 0, 0);
            return dateObj;

        }
        /** Checks if the provided time is before or after the current time
         * Returns true if time has passed and false if time is in the future
         * @params time {Date}
         * @return {Boolean}
         **/
    hasTimePassed(time) {
        let currentTime = Date.now();
        if (time.valueOf() >= currentTime) {
            return false;
        }
        else {
            return true;
        }

    }
    getTomorrowAtMidnight() {
        let tomorrowAtMidnight = Date.now() + 86400000;
        tomorrowAtMidnight = new Date(tomorrowAtMidnight);
        tomorrowAtMidnight.setHours(0, 0, 0, 0);
        return tomorrowAtMidnight.getTime();
    }

    /** Calculates the amount of time until the next occurrance of the requested time
     * @params desiredTime {String}
     * String is accepted in the form of "HHMMSS"
     * For strings less than 6 values will be omitted starting from the hours
     * For strings greater than 6 values, -1 will be returned
     * @return {Number} milliseconds until Invocation
     * */

    timeUntilInvocation(strTime) {
        if (!strTime) {
            return 0;
        }
        else if (strTime.length > 6) {
            return -1;
        }
        //check if time has passed
        let currentTime = Date.now();
        let millisecondsToDesiredTimeFromMidnight = this.timeStringToMilliseconds(strTime);

        let desiredInovocationTimeForToday = (this.todayAtMidnight).getTime() + millisecondsToDesiredTimeFromMidnight;
        if (this.hasTimePassed(desiredInovocationTimeForToday)) {
            //set it for tomorrow at this time
            console.log("That time has passed for today! We'll set it for tomorrow at that time");
            //Get time until midnight
            let timeUntilMidnight = this.getTomorrowAtMidnight() - currentTime;
            //add millisecondsToDesiredTimeFromMidnight
            return timeUntilMidnight + millisecondsToDesiredTimeFromMidnight;

        }
        else {
            //return the difference between now and desired time
            console.log("That time hasn't passed yet today. We'll set the timer");
            console.log()
            return desiredInovocationTimeForToday - currentTime;
        }
    }

    timeStringValidator(strTime = "000000") {
        /*if a number greater than 2 is in the [0] position,
        greater than 3 in the 1
        greater than 5 in the 2
        greater than 5 in the 4
        */
        //if less than 6, fill in zeros to make it 6
        if (strTime.length > 6) {
            console.error("time string was too long");
            return false;
        }
        else if (/[^\d]/.test(strTime)) {
            /*Check of non-digit characters*/
            console.error("string contains non-digit characters");
            return false;
        }
        let diffLen = 6 - strTime.length;
        if (diffLen) {
            for (let i = 0; i < diffLen; i++) {
                strTime = "0" + strTime;
            }
        }
        //if nums are all valid then pass it
        if (strTime[0].match(/[0-2]/) && strTime[2].match(/[0-5]/) && strTime[4].match(/[0-5]/)) {
            if (strTime[0] === "2") {
                if (strTime[1].match(/[0-3]/)) {
                    return true;
                }
            }
            else {
                if (strTime[1].match(/[0-9]/)) {
                    return true;
                }
            }
        }
        return false;
    }
    timeStringToMilliseconds(timeString) {
        //break string apart
        let totalMilliseconds = 0;
        let seconds = parseInt(timeString[4] + timeString[5]);
        let minutes = parseInt(timeString[2] + timeString[3]);
        let hours = parseInt(timeString[0] + timeString[1]);
        seconds = seconds * 1000;
        minutes = minutes * 60 * 1000;
        hours = hours * 60 * 60 * 1000;
        totalMilliseconds = seconds + minutes + hours;
        return totalMilliseconds;

    }

}


module.exports = DelayTimer;
