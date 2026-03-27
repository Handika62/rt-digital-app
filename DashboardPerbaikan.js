
export default DashboardPerbaikan;
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const DashboardPerbaikan = () => {
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "laporan_perbaikan"), (snapshot) => {
      setLaporan(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const exportCSV = async () => {
    // Header CSV
    let csv = "Nama,Lokasi,Deskripsi,Status,Tanggal Lapor\n";

    // Isi data
    laporan.forEach((item) => {
      const tanggal = item.tanggalLapor
        ? new Date(item.tanggalLapor.seconds * 1000).toLocaleDateString()
        : "";
      csv += `${item.nama},${item.lokasi},${item.deskripsi},${item.status},${tanggal}\n`;
    });

    // Simpan file
    const fileUri = FileSystem.documentDirectory + "laporan_perbaikan.csv";
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });

    // Bagikan file
    await Sharing.shareAsync(fileUri);
  };

  const renderHeader = () => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.header]}>Nama</Text>
      <Text style={[styles.cell, styles.header]}>Lokasi</Text>
      <Text style={[styles.cell, styles.header]}>Deskripsi</Text>
      <Text style={[styles.cell, styles.header]}>Status</Text>
      <Text style={[styles.cell, styles.header]}>Tanggal</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    const tanggal = item.tanggalLapor
      ? new Date(item.tanggalLapor.seconds * 1000).toLocaleDateString()
      : "";
    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{item.nama}</Text>
        <Text style={styles.cell}>{item.lokasi}</Text>
        <Text style={styles.cell}>{item.deskripsi}</Text>
        <Text style={styles.cell}>{item.status}</Text>
        <Text style={styles.cell}>{tanggal}</Text>
      </View>
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Dashboard Laporan Perbaikan (Real-time)
      </Text>
      <Button title="Export CSV" onPress={exportCSV} />

      {renderHeader()}
      <FlatList
        data={laporan}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 5,
  },
  header: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
});

export default DashboardPerbaikan;
