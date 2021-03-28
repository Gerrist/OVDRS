"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = __dirname + '/' + process.argv[2] + '/ExportCHBLatest-quays-and-props-selection.json';
if (fs.existsSync(path)) {
    try {
        var chb = JSON.parse(fs.readFileSync(path).toString());
        var stopAreas_1 = {};
        var spcc_1 = 0;
        chb.forEach(function (q) {
            // if(JSON.stringify(q).indexOf('40000130') > -1){
            // if(q.quaycode == 'NL:Q:40004001'){
            // != 'expired'
            // console.log(q);
            if ('stopplace' in q) {
                if ('stopplacecode' in q.stopplace) {
                    var spc = q.stopplace.stopplacecode;
                    if (!(spc in stopAreas_1)) {
                        var _a = q.geo, lon = _a.lon, lat = _a.lat;
                        var _b = q.stopplace.stopplacename, town = _b.town, street = _b.street, publicname = _b.publicname;
                        var stopplacetype = q.stopplace.stopplacetype;
                        stopAreas_1[q.stopplace.stopplacecode] = {
                            name: publicname !== null && publicname !== void 0 ? publicname : "-",
                            street: street !== null && street !== void 0 ? street : "-",
                            town: town !== null && town !== void 0 ? town : "-",
                            type: stopplacetype !== null && stopplacetype !== void 0 ? stopplacetype : "-",
                            geo: [parseFloat(lat), parseFloat(lon)],
                            stops: []
                        };
                    }
                    stopAreas_1[q.stopplace.stopplacecode].stops.push("S:" + q.quaycode.replace("NL:Q:", "").replace("BE:Q:", "").replace("DE:Q:", ""));
                }
            }
            else {
                console.log("SPC doesn't exist", q);
                spcc_1++;
                console.log(spcc_1);
            }
            // }
        });
        fs.writeFileSync(__dirname + '/' + process.argv[2] + '/chb.btm.json', JSON.stringify(stopAreas_1));
    }
    catch (e) {
        throw e;
    }
}
else {
    console.log("! " + path);
    throw 'ExportCHBLatest-quays-and-props-selection.json doesn\'t exist';
}
