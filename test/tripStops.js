"use strict";
exports.__esModule = true;
var fs = require("fs");
var moment = require("moment");
var date = process.argv[2];
var trip = process.argv[3];
if (process.argv.length == 4) {
}
else {
    if (process.argv.length < 4) {
        throw 'Niet genoeg argumenten (date, trip)';
    }
    if (process.argv.length > 4) {
        throw 'Te veel argumenten (date, trip)';
    }
}
if (fs.existsSync(__dirname + '/' + date + '.json')) {
    var ovdrs_1 = JSON.parse(fs.readFileSync(__dirname + '/' + date + '.json').toString());
    if (trip in ovdrs_1.trips) {
        console.log('Lijn ' + ovdrs_1.trips[trip].line.split(':')[1] + ' naar ' + ovdrs_1.trips[trip].destination + ' gereden door ' + ovdrs_1.trips[trip].operator + ':');
        ovdrs_1.trips[trip].route.forEach(function (t, i) {
            var stop = ovdrs_1.stops[t];
            var arrivalTimes = ovdrs_1.trips[trip].arrivalTimes;
            var departureTimes = ovdrs_1.trips[trip].departureTimes;
            var calls = ovdrs_1.trips[trip].calls;
            var cancelled = ovdrs_1.trips[trip].cancelled;
            if (arrivalTimes[i] != null && (arrivalTimes[i] != departureTimes[i])) {
                console.log((calls.indexOf(t) != null ? 'A' : '-') + " " + moment().startOf('day').add(arrivalTimes[i], 'seconds').format('HH:mm:ss') + ": " + stop[0] + " " + stop[2] + " " + (cancelled.indexOf(t) > -1 ? 'GEANNULEERD' : ''));
            }
            if (departureTimes[i] != null) {
                console.log((calls.indexOf(t) != null ? 'V' : '-') + " " + moment().startOf('day').add(departureTimes[i], 'seconds').format('HH:mm:ss') + ": " + stop[0] + " " + stop[2] + " " + (cancelled.indexOf(t) > -1 ? 'GEANNULEERD' : ''));
            }
        });
    }
    else {
        throw "Trip " + trip + " not found in file '" + date + ".json'!";
    }
}
else {
    throw "Trip file '" + date + ".json' not found!";
}
