import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const DashboardIuran = () => {
  const [iuran, setIuran] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "iuran_sampah"), (snapshot) => {
      setIuran(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const exportCSV = async () => {
    // Header CSV
    let csv = "Nama,Bulan,Jumlah,Status\n";

    // Isi data
    iuran.forEach((item) => {
      csv += `${item.nama},${item.bulan},${item.jumlah},${item.jumlah > 0 ? "Sudah Bayar" : "Belum Bayar"}\n`;
    });

    // Simpan file
    const fileUri = FileSystem.documentDirectory + "laporan_iuran.csv";
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });

    // Bagikan file
    await Sharing.shareAsync(fileUri);
  };

  const renderHeader = () => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.header]}>Nama</Text>
      <Text style={[styles.cell, styles.header]}>Bulan</Text>
      <Text style={[styles.cell, styles.header]}>Jumlah</Text>
      <Text style={[styles.cell, styles.header]}>Status</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nama}</Text>
      <Text style={styles.cell}>{item.bulan}</Text>
      <Text style={styles.cell}>Rp {item.jumlah}</Text>
      <Text style={styles.cell}>
        {item.jumlah > 0 ? "Sudah Bayar" : "Belum Bayar"}
      </Text>
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Dashboard Iuran Sampah (Real-time)
      </Text>
      <Button title="Export CSV" onPress={exportCSV} />

      {renderHeader()}
      <FlatList
        data={iuran}
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
  },
  header: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
});

export default DashboardIuran;
