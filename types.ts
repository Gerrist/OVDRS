export type Coordinates = [number, number];

export type Trip = {
    "line": string,
    "operator": string,
    "destination": string,
    "route": Array<number>,
    "calls": Array<number>,
    "cancelled": Array<number>,
    "arrivalTimes": Array<number | null>,
    "departureTimes": Array<number | null>
};

export type OVDRS = {
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
