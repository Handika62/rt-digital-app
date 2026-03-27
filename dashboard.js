import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const [perbaikan, setPerbaikan] = useState([]);

  // Ambil data dari Firestore
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "perbaikan"));
      setPerbaikan(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };
    fetchData();
  }, []);

  // Fungsi update status
  const updateStatus = async (id, statusBaru) => {
    try {
      const perbaikanRef = doc(db, "perbaikan", id);
      await updateDoc(perbaikanRef, { status: statusBaru });
      alert("Status berhasil diperbarui!");

      // Refresh data setelah update
      const querySnapshot = await getDocs(collection(db, "perbaikan"));
      setPerbaikan(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    } catch (e) {
      console.error("Error update status: ", e);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Daftar Laporan Perbaikan
      </Text>

      <FlatList
        data={perbaikan}
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
            <Text>Jenis: {item.jenis}</Text>
            <Text>Lokasi: {item.lokasi}</Text>
            <Text>Status: {item.status}</Text>

            {item.status !== "selesai" && (
              <Button
                title="Tandai Selesai"
                onPress={() => updateStatus(item.id, "selesai")}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Dashboard;
