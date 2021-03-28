import * as fs from "fs";
import {OVDRS, Trip} from './types';
import moment = require("moment");

export function getStopAreas(ovdrs: any): Promise<Array<any>> {
    return new Promise<Array<any>>((resolve, reject) => {
        resolve(ovdrs.stopAreas);
    });
}

export function resolveStopArea(ovdrs: OVDRS, stopId: string) {
    let stopArea = "S:UNKNOWN";
    Object.keys(ovdrs.stopAreas).forEach(s => {
        let sa = ovdrs.stopAreas[s];
        if(stopId.slice(-1) == ':'){
            stopId = stopId.slice(0, -1);
        }
        if (sa.stops.includes(stopId)) {
            stopArea = s;
        }
    });

    return stopArea;
}

export function getStop(ovdrs: any, stop): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        resolve(ovdrs.stopAreas[stop]);
    });
}

export function getDepartures(ovdrs: any, stop: string): Promise<Array<Trip>> {
    return new Promise<Array<Trip>>((resolve, reject) => {
        if (stop in ovdrs.stopAreas) {
            let mmt = moment();
            let ts = mmt.diff(mmt.clone().startOf('day'), 'seconds');
            let stopArea = ovdrs.stopAreas[stop];

            let departures = [];


            stopArea.stops.forEach(s => {
                Object.keys(ovdrs.trips).forEach((tid: any) => {
                    let t = ovdrs.trips[tid];
                    let index = t.calls.indexOf(s);


                    if (index > -1) {
                        if (t.departureTimes[index] > ts - 120) {
                            if(!(index == t.calls.length - 1)){
                                departures.push({
                                    realtimeTripId: tid,
                                    operator: t.operator,
                                    line: t.line,
                                    formula: t.formula,
                                    destination: t.destination,
                                    arrivalTime: t.arrivalTimes[index],
                                    departureTime: t.departureTimes[index],
                                    doNotBoard: index == t.calls.length - 1,
                                    arrivingFrom: ovdrs.stops[t.calls[0]][0],
                                    platform: ovdrs.stops[t.calls[index]]
                                });
                            }


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

            // departures.forEach(d => {

            // });

            resolve(departures);

        } else {
            console.log(Object.keys(ovdrs.stopAreas));
            console.log(`${stop} in ovdrs.stopAreas`);
            console.log(stop in ovdrs.stopAreas);
            reject('Stop not found');
        }
    });
}

export function getStopLines(ovdrs: any, stop: string): Promise<Array<Trip>> {
    return new Promise<Array<Trip>>((resolve, reject) => {
        if (stop in ovdrs.stopAreas) {
            console.log(stop);
            let mmt = moment();
            let ts = mmt.diff(mmt.clone().startOf('day'), 'seconds');
            let stopArea = ovdrs.stopAreas[stop];

            let lines = [];


            stopArea.stops.forEach(s => {
                Object.keys(ovdrs.trips).forEach((tid: any) => {
                    let t = ovdrs.trips[tid];
                    let index = t.calls.indexOf(s);


                    if (index > -1) {
                        if (!lines.includes(t.line)) {
                            lines.push(t.line);
                        }
                    }



                });
            });

            lines.sort((a, b) => {
                a = a.split(":")[1];
                b = b.split(":")[1];

                if (parseInt(a) < parseInt(b)) {
                    return -1;
                }
                if (parseInt(a) > parseInt(b)) {
                    return 1;
                }
                return 0;
            });

            resolve(lines);

        } else {
            console.log(Object.keys(ovdrs.stopAreas));
            console.log(`${stop} in ovdrs.stopAreas`);
            console.log(stop in ovdrs.stopAreas);
            reject('Stop not found');
        }
    });
}

export function getStopOperators(ovdrs: any, stop: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        if (stop in ovdrs.stopAreas) {
            let mmt = moment();
            let ts = mmt.diff(mmt.clone().startOf('day'), 'seconds');
            let stopArea = ovdrs.stopAreas[stop];

            let operators = [];


            stopArea.stops.forEach(s => {
                Object.keys(ovdrs.trips).forEach((tid: any) => {
                    let t = ovdrs.trips[tid];
                    let index = t.calls.indexOf(s);


                    if (index > -1) {
                        if (!operators.includes(t.operator)) {
                            operators.push(t.operator);
                        }
                    }



                });
            });

            operators.sort((a, b) => {
                if (parseInt(a) < parseInt(b)) {
                    return -1;
                }
                if (parseInt(a) > parseInt(b)) {
                    return 1;
                }
                return 0;
            });

            resolve(operators);

        } else {
            console.log(Object.keys(ovdrs.stopAreas));
            console.log(`${stop} in ovdrs.stopAreas`);
            console.log(stop in ovdrs.stopAreas);
            reject('Stop not found');
        }
    });
}

export function getTrip(ovdrs: any, realtimeTripId: string): Promise<Array<Trip>> {
    return new Promise<Array<Trip>>((resolve, reject) => {
        let callsList = [];
        if (realtimeTripId in ovdrs.trips) {
            // console.log('Lijn ' + ovdrs.trips[realtimeTripId].line.split(':')[1] + ' naar ' + ovdrs.trips[trip].destination + ' gereden door ' + ovdrs.trips[trip].operator + ':');

            ovdrs.trips[realtimeTripId].route.forEach((t, i) => {
                console.log(t, ovdrs.stops[t]);
                let stop = ovdrs.stops[t];
                let arrivalTime = ovdrs.trips[realtimeTripId].arrivalTimes[i];
                let departureTime = ovdrs.trips[realtimeTripId].departureTimes[i];
                let calls = ovdrs.trips[realtimeTripId].calls.indexOf(t) > -1;
                let cancelled = ovdrs.trips[realtimeTripId].cancelled.indexOf(t) > -1;
                let stopArea = resolveStopArea(ovdrs, t);

                callsList.push({
                    stop,
                    arrivalTime,
                    departureTime,
                    calls,
                    cancelled,
                    stopArea,
                    stopId: t
                });

                // if(arrivalTimes[i] != null && (arrivalTimes[i] != departureTimes[i])){
                //     console.log(`${(calls.indexOf(t) != null ? 'A' : '-')} ${moment().startOf('day').add(arrivalTimes[i], 'seconds').format('HH:mm:ss')}: ${stop[0]} ${stop[2]} ${(cancelled.indexOf(t) > -1 ? 'GEANNULEERD' : '')}`);
                // }
                //
                // if(departureTimes[i] != null){
                //     console.log(`${(calls.indexOf(t) != null ? 'V' : '-')} ${moment().startOf('day').add(departureTimes[i], 'seconds').format('HH:mm:ss')}: ${stop[0]} ${stop[2]} ${(cancelled.indexOf(t) > -1 ? 'GEANNULEERD' : '')}`);
                // }
            });

            resolve(callsList);
        } else {
            reject(`Trip ${realtimeTripId} not found`);
        }
    });
}
