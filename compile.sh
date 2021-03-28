#!/bin/bash
T="$(date +%s)"

if [ $# -eq 0 ]
  then
    echo "No arguments supplied. Please include date in YYYY-MM-DD fo#rmat"
    exit 1
fi

mkdir tmp
echo "Installing unzip"
apt install unzip
echo "OVDRS COMPILE: Downloading GTFS"
wget http://gtfs.ovapi.nl/nl/gtfs-nl.zip -O tmp/gtfs.zip
echo "OVDRS COMPILE: Unzipping GTFS"
unzip -o tmp/gtfs.zip -d tmp/gtfs
mkdir tmp/gtfs/stop_times_parts
echo "OVDRS COMPILE: Splitting stop_times file into parts"
split -l 100000 tmp/gtfs/stop_times.txt tmp/gtfs/stop_times_parts/stop_times_
echo "OVDRS COMPILE: Downloading latest CHB"
node --max_old_space_size=8192 parseLatestCHB.js
rm -rf scrapeNDOV
echo "OVDRS COMPILE: Parsing CHB"
tsc parseCHB.ts
node parseCHB.js tmp
echo "OVDRS COMPILE: Generating train CHB json"
ts-node gtfsTrainStopsCHB.ts tmp
echo "OVDRS COMPILE: Generating BTM CHB json"
tsc generateOVDRS.ts
node --max_old_space_size=8192 generateOVDRS.js tmp $1
rm -rf tmp
rm ExportCHBLatest.xml
rm ExportCHBLatest.xml.gz

T="$(($(date +%s)-T))"


echo "OVDRS file generated for $1 in ${T} seconds!"
