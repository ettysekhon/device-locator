import { DEVICES } from "@/constants/Devices";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export const options = { title: 'Devices' };

export default function DevicesTab() {
  const [q, setQ] = useState("");
  const items = useMemo(
    () => DEVICES.filter(d => d.name.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search devices…"
        value={q}
        onChangeText={setQ}
        style={styles.input}
      />
      <FlatList
        data={items}
        keyExtractor={(d) => d.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push(`/device/${item.id}`)}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.sub}>
              {(item.status ?? "unknown")} · {item.lastSeen ? new Date(item.lastSeen).toLocaleString() : ""}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12 },
  row: { padding: 12, borderRadius: 10, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee" },
  title: { fontSize: 16, fontWeight: "600" },
  sub: { color: "#666", marginTop: 4 },
});
