import * as fs from "fs";
import moment = require("moment");

type Coordinates = [number, number];

type Trip = {
    "line": string,
    "operator": string,
    "destination": string,
    "route": Array<number>,
    "calls": Array<number>,
    "cancelled": Array<number>,
    "arrivalTimes": Array<number | null>,
    "departureTimes": Array<number | null>
};

type OVDRS = {
    "date": string,
    stops: {
        [key: number]: [string, string, string | null, Coordinates], // [4000010]: ["Stop name", "Stop town", "Platform" (null if n.a.), Coordinates[lat, lng]],
    },
    "trips": {
        [key: string]: Trip;
    }
};

let date = process.argv[2];
let trip = process.argv[3];

if (process.argv.length == 4) {

} else {
    if (process.argv.length < 4) {
        throw 'Niet genoeg argumenten (date, trip)'
    }
    if (process.argv.length > 4) {
        throw 'Te veel argumenten (date, trip)'
    }
}

if (fs.existsSync(__dirname + '/' + date + '.json')) {
    let ovdrs: OVDRS = JSON.parse(fs.readFileSync(__dirname + '/' + date + '.json').toString());
    if (trip in ovdrs.trips) {
        console.log('Lijn ' + ovdrs.trips[trip].line.split(':')[1] + ' naar ' + ovdrs.trips[trip].destination + ' gereden door ' + ovdrs.trips[trip].operator + ':');

        ovdrs.trips[trip].route.forEach((t, i) => {
            let stop = ovdrs.stops[t];
            let arrivalTimes = ovdrs.trips[trip].arrivalTimes;
            let departureTimes = ovdrs.trips[trip].departureTimes;
            let calls = ovdrs.trips[trip].calls;
            let cancelled = ovdrs.trips[trip].cancelled;

            if(arrivalTimes[i] != null && (arrivalTimes[i] != departureTimes[i])){
                console.log(`${(calls.indexOf(t) != null ? 'A' : '-')} ${moment().startOf('day').add(arrivalTimes[i], 'seconds').format('HH:mm:ss')}: ${stop[0]} ${stop[2]} ${(cancelled.indexOf(t) > -1 ? 'GEANNULEERD' : '')}`);
            }

            if(departureTimes[i] != null){
                console.log(`${(calls.indexOf(t) != null ? 'V' : '-')} ${moment().startOf('day').add(departureTimes[i], 'seconds').format('HH:mm:ss')}: ${stop[0]} ${stop[2]} ${(cancelled.indexOf(t) > -1 ? 'GEANNULEERD' : '')}`);
            }
        });
    } else {
        throw `Trip ${trip} not found in file '${date}.json'!`;
    }
} else {
    throw `Trip file '${date}.json' not found!`;
}

