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
    "stopAreas": {
        [key: string]: any;
    }
    "trips": {
        [key: string]: Trip;
    }
};

let date = process.argv[2];
let stop = process.argv[3];

if (process.argv.length == 4) {
    if (fs.existsSync(__dirname + '/' + date + '.json')) {
        let ovdrs: OVDRS = JSON.parse(fs.readFileSync(__dirname + '/' + date + '.json').toString());
        if (stop in ovdrs.stopAreas) {
            let mmt = moment();
            let ts = mmt.diff(mmt.clone().startOf('day'), 'seconds');
            let stopArea = ovdrs.stopAreas[stop];

            let departures = [];

            console.log(`Departures for ${stopArea.name}:`);

            stopArea.stops.forEach(s => {
                Object.values(ovdrs.trips).forEach(t => {
                    let index = t.calls.indexOf(s);


                    if (index > -1) {
                        if(t.departureTimes[index] > ts - 120){
                            departures.push({
                                operator: t.operator,
                                line: t.line,
                                destination: t.destination,
                                arrivalTime: t.arrivalTimes[index],
                                departureTime: t.departureTimes[index],
                                doNotBoard: index == t.calls.length - 1,
                                arrivingFrom: ovdrs.stops[t.calls[0]][0]
                            });
                        }


                    }
                });
            });

            departures.sort((a, b) => {
                if (parseInt(a.departureTime) < parseInt(b.departureTime)) {
                    return -1;
                }
                if (parseInt(a.departureTime) > parseInt(b.departureTime)) {
                    return 1;
                }
                return 0;
            });

            departures.forEach(d => {
                if(!d.doNotBoard){
                    console.log(`${moment(d.departureTime * 1000).format('HH:mm')} ${d.line} ${d.destination} (${d.operator}) ${d.doNotBoard ? `TERMINUS (Arriving from ` + d.arrivingFrom + ')' : ''}`);
                }
            });

        } else {
            // console.log(JSON.stringify(Object.keys(ovdrs.stopAreas)));
            throw `Stop ${stop} not found in file '${date}.json'!`;
        }
    } else {
        throw `OVDRS file '${date}.json' not found!`;
    }

} else {
    if (process.argv.length < 4) {
        throw 'Niet genoeg argumenten (date, trip)'
    }
    if (process.argv.length > 4) {
        throw 'Te veel argumenten (date, trip)'
    }
}

