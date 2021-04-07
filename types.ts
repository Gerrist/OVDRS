export type Coordinates = [number, number];

export type Trip = {
    "line": string,
    "operator": string,
    "destination": string,
    "route": Array<any>,
    "calls": Array<any>,
    "departed": Array<any>,
    "arrived": Array<any>,
    "extra": Array<any>,
    "cancelled": Array<any>,
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
    "lines": {
        [key: string]: {
            lineReadable: string,
            operator: string
        };
    }
    "operators": {
        [key: string]: string;
    }
    "trips": {
        [key: string]: Trip;
    }
};
