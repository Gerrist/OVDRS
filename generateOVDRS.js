"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var moment = require("moment");
var csvrow = require("csvrow");
var GTFS;
(function (GTFS) {
    var Trip;
    (function (Trip) {
        Trip[Trip["route_id"] = 0] = "route_id";
        Trip[Trip["service_id"] = 1] = "service_id";
        Trip[Trip["trip_id"] = 2] = "trip_id";
        Trip[Trip["realtime_trip_id"] = 3] = "realtime_trip_id";
        Trip[Trip["trip_headsign"] = 4] = "trip_headsign";
        Trip[Trip["trip_short_name"] = 5] = "trip_short_name";
        Trip[Trip["trip_long_name"] = 6] = "trip_long_name";
        Trip[Trip["direction_id"] = 7] = "direction_id";
        Trip[Trip["block_id"] = 8] = "block_id";
        Trip[Trip["shape_id"] = 9] = "shape_id";
        Trip[Trip["wheelchair_accessible"] = 10] = "wheelchair_accessible";
        Trip[Trip["bikes_allowed"] = 11] = "bikes_allowed";
    })(Trip = GTFS.Trip || (GTFS.Trip = {}));
    var StopTime;
    (function (StopTime) {
        StopTime[StopTime["trip_id"] = 0] = "trip_id";
        StopTime[StopTime["stop_sequence"] = 1] = "stop_sequence";
        StopTime[StopTime["stop_id"] = 2] = "stop_id";
        StopTime[StopTime["stop_headsign"] = 3] = "stop_headsign";
        StopTime[StopTime["arrival_time"] = 4] = "arrival_time";
        StopTime[StopTime["departure_time"] = 5] = "departure_time";
        StopTime[StopTime["pickup_type"] = 6] = "pickup_type";
        StopTime[StopTime["drop_off_type"] = 7] = "drop_off_type";
        StopTime[StopTime["timepoint"] = 8] = "timepoint";
        StopTime[StopTime["shape_dist_traveled"] = 9] = "shape_dist_traveled";
        StopTime[StopTime["fare_units_traveled"] = 10] = "fare_units_traveled";
    })(StopTime = GTFS.StopTime || (GTFS.StopTime = {}));
    var Stop;
    (function (Stop) {
        Stop[Stop["stop_id"] = 0] = "stop_id";
        Stop[Stop["stop_code"] = 1] = "stop_code";
        Stop[Stop["stop_name"] = 2] = "stop_name";
        Stop[Stop["stop_lat"] = 3] = "stop_lat";
        Stop[Stop["stop_lon"] = 4] = "stop_lon";
        Stop[Stop["location_type"] = 5] = "location_type";
        Stop[Stop["parent_station"] = 6] = "parent_station";
        Stop[Stop["stop_timezone"] = 7] = "stop_timezone";
        Stop[Stop["wheelchair_boarding"] = 8] = "wheelchair_boarding";
        Stop[Stop["platform_code"] = 9] = "platform_code";
        Stop[Stop["zone_id"] = 10] = "zone_id";
    })(Stop = GTFS.Stop || (GTFS.Stop = {}));
    var Route;
    (function (Route) {
        Route[Route["route_id"] = 0] = "route_id";
        Route[Route["agency_id"] = 1] = "agency_id";
        Route[Route["route_short_name"] = 2] = "route_short_name";
        Route[Route["route_long_name"] = 3] = "route_long_name";
        Route[Route["route_desc"] = 4] = "route_desc";
        Route[Route["route_type"] = 5] = "route_type";
        Route[Route["route_color"] = 6] = "route_color";
        Route[Route["route_text_color"] = 7] = "route_text_color";
        Route[Route["route_url"] = 8] = "route_url";
    })(Route = GTFS.Route || (GTFS.Route = {}));
})(GTFS || (GTFS = {}));
function forceArray(data) {
    if (typeof data.forEach == 'function') { // reliable way to tell if data is Array
        return data; // return original data (array)
    }
    else {
        return [data]; // return single object as array with object
    }
}
if (fs.existsSync(__dirname + '/' + process.argv[2] + '/chb.btm.json')) {
    try {
        var ovTrips_1 = {};
        var ovStops_1 = {};
        // let relativeTimestamps = true;
        //
        // if(fs.existsSync(__dirname + '/ovdrs-config.json')){
        //     let config = JSON.parse(fs.readFileSync(__dirname + '/ovdrs-config.json').toString());
        //
        //     relativeTimestamps = config.relativeTimestamps;
        // }
        var dates_1 = {};
        var targetDateWD_1 = moment(process.argv[3], 'YYYY-MM-DD').format("YYYY-MM-DD");
        var targetDateND_1 = moment(process.argv[3], 'YYYY-MM-DD').format("YYYYMMDD");
        var chb = JSON.parse(fs.readFileSync(__dirname + '/' + process.argv[2] + '/chb.btm.json').toString());
        console.log("Excluding services for other days than " + targetDateWD_1 + "/" + targetDateND_1);
        var GTFScalendarDates = fs.readFileSync(__dirname + '/' + process.argv[2] + '/gtfs/calendar_dates.txt').toString();
        GTFScalendarDates.split("\n").forEach(function (c) {
            var cd = c.split(",");
            dates_1[cd[0]] = cd[1];
        });
        var services_1 = GTFScalendarDates.split("\n").filter(function (s) {
            var line = s.split(',');
            return (line[1] == targetDateND_1);
        }).map(function (s) {
            var line = s.split(',');
            return line[0];
        });
        console.log("Getting stops");
        var GTFSstops = fs.readFileSync(__dirname + '/' + process.argv[2] + '/gtfs/stops.txt').toString().split("\n");
        var stops_1 = {};
        GTFSstops.forEach(function (r) {
            var stop = r.split(",");
            // console.log(r.split(",")[GTFS.Stop.stop_id], r.split(","));
            stops_1[stop[GTFS.Stop.stop_id]] = r.split(",");
            var csv = csvrow.parse(r);
            var code = stop[GTFS.Stop.stop_code];
            // console.log(`'${r.split(",")[GTFS.Stop.stop_code]}' '${r.split(",")[GTFS.Stop.zone_id]}'`)
            if (typeof stop[GTFS.Stop.zone_id] == 'string') {
                if (stop[GTFS.Stop.zone_id].indexOf("IFF:") > -1) {
                    if (stop[GTFS.Stop.platform_code] == '') {
                        code = stop[GTFS.Stop.zone_id];
                    }
                    else {
                        code = stop[GTFS.Stop.zone_id] + ':' + stop[GTFS.Stop.platform_code];
                    }
                }
            }
            ovStops_1["S:" + code] = [csv[GTFS.Stop.stop_name], csv[GTFS.Stop.location_type], csv[GTFS.Stop.platform_code], [csv[GTFS.Stop.stop_lat], csv[GTFS.Stop.stop_lon]]];
        });
        console.log("Getting routes");
        var GTFSroutes = fs.readFileSync(__dirname + '/' + process.argv[2] + '/gtfs/routes.txt').toString().split("\n");
        var routes_1 = {};
        GTFSroutes.forEach(function (r) {
            routes_1[r.split(",")[GTFS.Route.route_id]] = r.split(",");
        });
        console.log("Getting today's trips");
        var GTFStrips = fs.readFileSync(__dirname + '/' + process.argv[2] + '/gtfs/trips.txt').toString().split("\n");
        var tripsObj_1 = {};
        var trips_1 = GTFStrips.filter(function (t) {
            var trip = t.split(",");
            return services_1.includes(trip[GTFS.Trip.service_id]);
        });
        trips_1.forEach(function (t) {
            tripsObj_1[t.split(",")[GTFS.Trip.trip_id]] = t;
        });
        console.log("Getting stop times");
        var stopTimes = {};
        var GTFSstopTimes = [];
        var skipped_1 = 0;
        var tempTripTimes_1 = {};
        fs.readdir(__dirname + '/' + process.argv[2] + '/gtfs/stop_times_parts', function (err, files) { return __awaiter(void 0, void 0, void 0, function () {
            var skippedHeader, lines, _i, files_1, file, filePath, _a, trips_2, t, routeId, tripId, realtimeTripId, tripStops, route, calls, arrivalTimes, departureTimes, _b, tripStops_1, s, code, hasPlatform, departureTime, arrivalTime, stopAreasBTM, stopAreasTrain, dataSet;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        skippedHeader = false;
                        lines = [];
                        _i = 0, files_1 = files;
                        _c.label = 1;
                    case 1:
                        if (!(_i < files_1.length)) return [3 /*break*/, 4];
                        file = files_1[_i];
                        filePath = __dirname + '/' + process.argv[2] + '/gtfs/stop_times_parts/' + file;
                        return [4 /*yield*/, fs.readFileSync(filePath).toString().split('\n').forEach(function (straw) {
                                if (!skippedHeader) {
                                    skippedHeader = true;
                                }
                                else {
                                    var st = straw.split(',');
                                    // console.log();
                                    // console.log(st[GTFS.StopTime.trip_id]);
                                    // console.log(tripsObj[st[GTFS.StopTime.trip_id]]);
                                    if (st[GTFS.StopTime.trip_id] in tripsObj_1) {
                                        var rti = tripsObj_1[st[GTFS.StopTime.trip_id]].split(",")[GTFS.Trip.realtime_trip_id];
                                        if (!(rti in tempTripTimes_1)) {
                                            tempTripTimes_1[rti] = [];
                                        }
                                        //
                                        tempTripTimes_1[rti].push(st);
                                        // tripsObj[st[GTFS.StopTime.trip_id]].realtime_trip_id
                                        // GTFSstopTimes.push(st);
                                    }
                                    else {
                                        skipped_1++;
                                    }
                                    lines.push(straw);
                                    if ((lines.length % 500000) == 0) {
                                        console.log('Approx. progress: ' + ((lines.length / 10945572) * 100).toFixed(2) + '%');
                                    }
                                }
                            })];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log("Temp trips: " + Object.keys(tempTripTimes_1).length);
                        console.log("Done. Reduced size by skipping " + skipped_1 + ' lines');
                        console.log("Processing...");
                        for (_a = 0, trips_2 = trips_1; _a < trips_2.length; _a++) {
                            t = trips_2[_a];
                            routeId = t.split(",")[GTFS.Trip.route_id];
                            tripId = t.split(",")[GTFS.Trip.trip_id];
                            realtimeTripId = t.split(",")[GTFS.Trip.realtime_trip_id];
                            tripStops = tempTripTimes_1[realtimeTripId];
                            route = [];
                            calls = [];
                            arrivalTimes = [];
                            departureTimes = [];
                            tripStops.sort(function (a, b) {
                                if (parseInt(a[GTFS.StopTime.stop_sequence]) < parseInt(b[GTFS.StopTime.stop_sequence])) {
                                    return -1;
                                }
                                if (parseInt(a[GTFS.StopTime.stop_sequence]) > parseInt(b[GTFS.StopTime.stop_sequence])) {
                                    return 1;
                                }
                                return 0;
                            });
                            for (_b = 0, tripStops_1 = tripStops; _b < tripStops_1.length; _b++) {
                                s = tripStops_1[_b];
                                code = stops_1[s[GTFS.StopTime.stop_id]][GTFS.Stop.stop_code];
                                if (typeof stops_1[s[GTFS.StopTime.stop_id]][GTFS.Stop.zone_id] == 'string') {
                                    if (stops_1[s[GTFS.StopTime.stop_id]][GTFS.Stop.zone_id].indexOf("IFF:") > -1) {
                                        hasPlatform = stops_1[s[GTFS.StopTime.stop_id]][GTFS.Stop.platform_code] != "";
                                        code = stops_1[s[GTFS.StopTime.stop_id]][GTFS.Stop.zone_id] + (hasPlatform ? ':' + stops_1[s[GTFS.StopTime.stop_id]][GTFS.Stop.platform_code] : '');
                                    }
                                }
                                route.push("S:" + code);
                                calls.push("S:" + code);
                                departureTime = moment.duration(s[GTFS.StopTime.departure_time], 'minutes').asSeconds();
                                arrivalTime = moment.duration(s[GTFS.StopTime.departure_time], 'minutes').asSeconds();
                                arrivalTimes.push(arrivalTime);
                                departureTimes.push(departureTime);
                                // console.log(s[GTFS.StopTime.stop_sequence], s[GTFS.StopTime.arrival_time], s[GTFS.StopTime.departure_time], s[GTFS.StopTime.stop_id], typeof s[GTFS.StopTime.stop_id], ]);
                            }
                            ovTrips_1[realtimeTripId] = {
                                line: routes_1[routeId][GTFS.Route.agency_id] + ":" + routes_1[routeId][GTFS.Route.route_short_name],
                                operator: routes_1[routeId][GTFS.Route.agency_id],
                                destination: t.split(",")[GTFS.Trip.trip_headsign],
                                formula: t.split(",")[GTFS.Trip.trip_long_name],
                                route: route,
                                calls: calls,
                                date: targetDateWD_1,
                                arrivalTimes: arrivalTimes,
                                departureTimes: departureTimes
                            };
                        }
                        console.log("Inserting BTM stopArea's");
                        stopAreasBTM = JSON.parse(fs.readFileSync(__dirname + '/' + process.argv[2] + '/chb.btm.json').toString());
                        console.log("Inserting Train stopArea's");
                        stopAreasTrain = JSON.parse(fs.readFileSync(__dirname + '/' + process.argv[2] + '/chb.train.json').toString());
                        dataSet = {
                            date: process.argv[3],
                            stops: ovStops_1,
                            // stops: {},
                            stopAreas: Object.assign(stopAreasBTM, stopAreasTrain),
                            // stopAreas: stopAreasTrain,
                            trips: ovTrips_1
                        };
                        console.log("Writing dataset to " + __dirname + '/' + process.argv[3] + '.json');
                        fs.writeFileSync(__dirname + '/' + process.argv[3] + '.json', JSON.stringify(dataSet));
                        console.log("Done!");
                        return [2 /*return*/];
                }
            });
        }); });
        // fs.createReadStream(__dirname + '/' + process.argv[2] + '/gtfs/stop_times.txt')
        //     .pipe(parse({delimiter: ','}))
        //     .on('data', function (csvrow) {
        //         GTFSstopTimes.push(csvrow);
        // })
        // .on('end', function (err) {
        //     console.log(err);
        // })
        // .on('end', function () {
        //     console.log("end");
        // GTFSstopTimes.forEach(stt => {
        //     let st = stt.split(",");
        //
        //     if (!(st[GTFS.StopTime.trip_id] in stopTimes)) {
        //         stopTimes[st[GTFS.StopTime.trip_id]] = [];
        //     }
        //
        //     stopTimes[st[GTFS.StopTime.trip_id]].push(st);
        // });
        //
        // console.log(stopTimes);
        //
        // console.log(tripsObj);
        //
        // trips.forEach(t => {
        //     // console.log(GTFStrips[t.split(",")[GTFS.Trip.trip_id]])
        //
        //     let routeId = t.split(",")[GTFS.Trip.route_id];
        //     let tripId = t.split(",")[GTFS.Trip.trip_id];
        //     let realtimeTripId = t.split(",")[GTFS.Trip.realtime_trip_id];
        //
        //     // console.log();
        //     // console.log(routeId);
        //     // console.log(tripId);
        //     // console.log(realtimeTripId);
        //     // console.log(routes[routeId]);
        //
        //     ovTrips[realtimeTripId] = {
        //         line: routes[routeId][GTFS.Route.route_short_name],
        //         operator: routes[routeId][GTFS.Route.agency_id],
        //         destination: t.split(",")[GTFS.Trip.trip_headsign],
        //         route: [],
        //         calls: [],
        //         cancelled: [],
        //         arrivalTimes: [],
        //         departureTimes: []
        //     }
        // });
        //
        // // console.log(`Getting stop times`);
        // // let GTFSstops = fs.readFileSync(__dirname + '/' + process.argv[2] + '/gtfs/stops.txt').toString().split("\n")
        // // let stops = GTFSstops.filter((s) => {
        // //     let stop = s.split(",");
        // //     return trips.includes(stop[GTFS.Stop.]);
        // // });
        //
        // console.log(ovTrips);
        // });
        // let GTFSstopTimes = fs.readFileSync(__dirname + '/' + process.argv[2] + '/gtfs/stop_times.txt').toString().split("\n")
        // let stopTimes = {};
        // fs.writeFileSync(__dirname + '/' + process.argv[2] + '/chb.btm.json', JSON.stringify(stopAreas));
    }
    catch (e) {
        throw e;
    }
}
else {
    throw 'chb.btm.json doesn\'t exist in directory ' + process.argv[2];
}
