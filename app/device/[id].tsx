import { DEVICES } from "@/constants/Devices";
import { useLocalSearchParams } from "expo-router";
import { Button, Linking, Platform, Text, View } from "react-native";

export default function DeviceDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const d = DEVICES.find(x => x.id === id);

  if (!d) return <View style={{ padding: 16 }}><Text>Device not found.</Text></View>;

  const openInMaps = () => {
    const label = encodeURIComponent(d.name);
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${d.lat},${d.lon}&q=${label}`,
      android: `geo:${d.lat},${d.lon}?q=${d.lat},${d.lon}(${label})`,
    })!;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{d.name}</Text>
      <Text style={{ color: "#666", marginVertical: 8 }}>
        {(d.status ?? "unknown")} · {d.lastSeen ? new Date(d.lastSeen).toLocaleString() : ""}
      </Text>
      <Button title="Open in Maps" onPress={openInMaps} />
    </View>
  );
}
