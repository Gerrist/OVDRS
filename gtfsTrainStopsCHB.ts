import * as fs from "fs";

let path = __dirname + '/' + process.argv[2] + '/gtfs/stops.txt';
import * as csvrow from 'csvrow';

export enum Stop {
    stop_id, stop_code, stop_name, stop_lat, stop_lon, location_type, parent_station, stop_timezone, wheelchair_boarding, platform_code, zone_id
}

function expand(_line, _enum) {
    let data = {};

    _line = _line.split(",,").join(",:EMPTY:,");


    for (const v of csvrow.parse(_line)) {
        let i = csvrow.parse(_line).indexOf(v);
        data[_enum[i]] = v.replace(':EMPTY:', '');
    }

    return data;
}

if (fs.existsSync(path)) {
    try {
        let stops = fs.readFileSync(path).toString().split("\n");

        let stopAreas: {
            [key: string]: any
        } = {};

        let needsStopAreas = [];
        let parentStations = {};

        stops.forEach(sl => {
            if (sl.trim().length > 0) {
                let stop: any = expand(sl, Stop);

                if (stop.stop_id.indexOf('stoparea:') > -1) {
                    parentStations[stop.stop_id] = stop;
                }
            }
        });

        stops.forEach(sl => {
            if (sl.trim().length > 0) {
                let stop: any = expand(sl, Stop);


                let zoneId = stop.zone_id ?? "";

                let isTrainStop = (zoneId.indexOf("IFF:") > -1);

                if (isTrainStop) {
                    if(!(stop.zone_id in stopAreas)){
                        stopAreas[stop.zone_id] = {
                            name: stop.stop_name,
                            street: "-",
                            town: "-",
                            geo: [parseFloat(stop.stop_lat), parseFloat(stop.stop_lon)],
                            type: "railStation",
                            stops: [],

                        }
                    }


                    // console.log('S:' + stop.zone_id + ((stop.platform_code == '' || typeof stop.platform_code == 'undefined') ? '' : ':' + stop.platform_code));

                    stopAreas[stop.zone_id].stops.push('S:' + stop.zone_id + ((stop.platform_code == '' || typeof stop.platform_code == 'undefined') ? '' : ':' + stop.platform_code));
                }

            }


        });

        // console.log(stopAreas);

        // stops.forEach(s => {
        //     let stop = s.split(",");
        //     // if(JSON.stringify(q).indexOf('40000130') > -1){
        //     // if(q.quaycode == 'NL:Q:40004001'){
        //
        //         // != 'expired'
        //         // console.log(q);
        //
        //         if(!(q.stopplace.stopplacecode in stopAreas)){
        //             stopAreas[q.stopplace.stopplacecode] = {
        //                 name: q.stopplace.stopplacename.publicname ?? "-",
        //                 street: q.stopplace.stopplacename.street ?? "-",
        //                 town: q.stopplace.stopplacename.town ?? "-",
        //                 type: q.stopplace.stopplacetype ?? "-",
        //                 geo: [q.geo.lat, q.geo.lon],
        //                 stops: []
        //             }
        //         }
        //
        //         stopAreas[q.stopplace.stopplacecode].stops.push(q.quaycode.replace(":Q:", ":"));
        //     // }
        //
        //
        // });

        fs.writeFileSync(__dirname + '/' + process.argv[2] + '/chb.train.json', JSON.stringify(stopAreas));
    } catch (e) {
        throw e;
    }
} else {
    throw 'Required file missing: ' + path;
}
