import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const DashboardPerbaikan = () => {
  const [laporan, setLaporan] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "laporan_perbaikan"));
    setLaporan(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, statusBaru) => {
    try {
      const laporanRef = doc(db, "laporan_perbaikan", id);
      await updateDoc(laporanRef, { status: statusBaru });
      alert("Status berhasil diubah!");
      fetchData(); // refresh data
    } catch (e) {
      console.error("Error update status: ", e);
    }
  };

  const renderHeader = () => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.header]}>Nama</Text>
      <Text style={[styles.cell, styles.header]}>Lokasi</Text>
      <Text style={[styles.cell, styles.header]}>Deskripsi</Text>
      <Text style={[styles.cell, styles.header]}>Status</Text>
      <Text style={[styles.cell, styles.header]}>Aksi</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nama}</Text>
      <Text style={styles.cell}>{item.lokasi}</Text>
      <Text style={styles.cell}>{item.deskripsi}</Text>
      <Text style={styles.cell}>{item.status}</Text>
      <View style={[styles.cell, { flexDirection: "row", justifyContent: "center" }]}>
        <Button title="Diproses" onPress={() => updateStatus(item.id, "Diproses")} />
        <Button title="Selesai" onPress={() => updateStatus(item.id, "Selesai")} />
      </View>
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Dashboard Laporan Perbaikan
      </Text>
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
