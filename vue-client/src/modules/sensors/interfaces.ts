export interface ReadingsResponse {
  count: number;
  data: Reading[];
}

export interface savedReading {
  data: {
    lpg: number;
    temp: number;
    motion: boolean;
    light: boolean;
    smoke: number;
    humidity: number;
    co: number;
  };
}

export interface Reading {
  lpg: number;
  temp: number;
  sensor: SensorID;
  motion: boolean;
  light: boolean;
  smoke: number;
  humidity: number;
  co: number;
  timestamp: string;
}

export interface Form {
  lpg?: number;
  temp?: number;
  sensor?: SensorID;
  motion?: boolean;
  light?: boolean;
  smoke?: number;
  humidity?: number;
  co?: number;
  timestamp?: string;
}

export enum SensorID {
  B827EbBf9D51 = "b8:27:eb:bf:9d:51",
  The000F0070910A = "00:0f:00:70:91:0a",
  The1CBfCe15Ec4D = "1c:bf:ce:15:ec:4d",
}
