import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const DashboardIuran = () => {
  const [iuran, setIuran] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "iuran_sampah"));
      setIuran(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Daftar Iuran Sampah
      </Text>

      <FlatList
        data={iuran}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              marginVertical: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
            }}
          >
            <Text>Nama: {item.nama}</Text>
            <Text>Bulan: {item.bulan}</Text>
            <Text>Jumlah: Rp {item.jumlah}</Text>
            <Text>Tanggal Bayar: {new Date(item.tanggalBayar.seconds * 1000).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DashboardIuran;
