import * as fs from "fs";

let path = __dirname + '/' + process.argv[2] + '/ExportCHBLatest-quays-and-props-selection.json';

if (fs.existsSync(path)) {
    try {
        let chb = JSON.parse(fs.readFileSync(path).toString());

        let stopAreas: {
            [key: string]: any
        } = {};

        let spcc = 0;

        chb.forEach(q => {
            // if(JSON.stringify(q).indexOf('40000130') > -1){
            // if(q.quaycode == 'NL:Q:40004001'){

            // != 'expired'
            // console.log(q);

            if('stopplace' in q){
                if('stopplacecode' in q.stopplace){
                    let spc = q.stopplace.stopplacecode;

                    if (!(spc in stopAreas)) {
                        const {lon, lat} = q.geo;
                        const {town, street, publicname} = q.stopplace.stopplacename;
                        const {stopplacetype} = q.stopplace;
                        stopAreas[q.stopplace.stopplacecode] = {
                            name: publicname ?? "-",
                            street: street ?? "-",
                            town: town ?? "-",
                            type: stopplacetype ?? "-",
                            geo: [parseFloat(lat), parseFloat(lon)],
                            stops: []
                        }
                    }

                    stopAreas[q.stopplace.stopplacecode].stops.push("S:" + q.quaycode.replace("NL:Q:", "").replace("BE:Q:", "").replace("DE:Q:", ""));
                }
            } else {
                console.log("SPC doesn't exist", q);
                spcc++;
                console.log(spcc);
            }
            // }


        });

        fs.writeFileSync(__dirname + '/' + process.argv[2] + '/chb.btm.json', JSON.stringify(stopAreas));
    } catch (e) {
        throw e;
    }
} else {
    console.log("! " + path);
    throw 'ExportCHBLatest-quays-and-props-selection.json doesn\'t exist';
}
