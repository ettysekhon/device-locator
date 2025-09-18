import { DEVICES } from "@/constants/Devices";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import type MapViewType from "react-native-maps";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapTab() {
  const ref = useRef<MapViewType>(null);

  useEffect(() => {
    if (!ref.current || DEVICES.length === 0) return;
    ref.current.fitToCoordinates(
      DEVICES.map(d => ({ latitude: d.lat, longitude: d.lon })),
      { edgePadding: { top: 60, right: 60, bottom: 60, left: 60 }, animated: true }
    );
  }, []);

  const first = DEVICES[0];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={ref}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: first.lat,
          longitude: first.lon,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        {DEVICES.map(d => (
          <Marker key={d.id} coordinate={{ latitude: d.lat, longitude: d.lon }} title={d.name} />
        ))}
      </MapView>
    </View>
  );
}
