import * as ejs from "ejs"
import * as express from "express";
import {getDepartures, getStop, getStopAreas, getStopLines, getStopOperators, getTrip} from "./api";
import * as fs from "fs";
import {Trip} from "./types";
import moment = require("moment");

let app = express();
app.set("view engine", "ejs");
app.set("views", "./web");


const date = "2021-04-02";
let ovdrs;

// app.use("/static", express.static(__dirname + '/web/static'));

// app.get("/", (req, res) => {
//     res.send("Please include a YYYY-MM-DD in url (localhost:8080/YYYY-MM-DD)");
// });

app.get("/", (req, res) => {
    getStopAreas(ovdrs).then(stopAreas => {
        res.render('stopAreas', {stopAreas: stopAreas});
    });
});

app.get("/departures/:stopArea", async (req, res) => {
    try {
        let stop = await getStop(ovdrs, req.params.stopArea);
        getDepartures(ovdrs, req.params.stopArea).then(async departures => {
            let lines = await getStopLines(ovdrs, req.params.stopArea);
            let operators = await getStopOperators(ovdrs, req.params.stopArea);
            res.render('departures', {
                departures,
                stop,
                moment,
                stopArea: ovdrs.stopAreas[req.params.stopArea],
                lines,
                operators
            });
        });
    } catch (e) {
        res.send({e});
    }
    // let departures: Array<Trip> = [];
    // res.render('departures', {departures});
});

app.all("/trip/:realtimeTripId", (req, res) => {
    try {
        let line = ovdrs.trips[req.params.realtimeTripId].line.split(':')[1];
        let destination = ovdrs.trips[req.params.realtimeTripId].destination;
        let operator = ovdrs.trips[req.params.realtimeTripId].operator;


        getTrip(ovdrs, req.params.realtimeTripId).then(calls => {
            res.render('trip', {calls, moment, line, destination, operator});
        }).catch(err => {
            res.send(err);
        });
    } catch (e) {
        res.send(e);
    }
});

app.listen(8888, () => {
    console.log(`MealMaster Manager Web running on port 8888`);
    let path = __dirname + '/' + date + '.json';
    if (fs.existsSync(path)) {
        ovdrs = JSON.parse(fs.readFileSync(path).toString());
    } else {
        console.log(`File '${path}' does not exist!`);
    }
});
