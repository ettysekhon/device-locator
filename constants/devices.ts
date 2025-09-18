export type Device = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  status?: "online" | "offline";
  lastSeen?: string;
};

export const DEVICES: Device[] = [
  { id: "d1", name: "Forklift A1", lat: 51.5074, lon: -0.1278, status: "online", lastSeen: "2025-09-18T09:10:00Z" },
  { id: "d2", name: "Pallet Jack 3", lat: 51.509, lon: -0.09,   status: "offline", lastSeen: "2025-09-18T08:55:00Z" }
];
