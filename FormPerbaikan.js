import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const FormPerbaikan = () => {
  const [nama, setNama] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const laporPerbaikan = async () => {
    try {
      await addDoc(collection(db, "laporan_perbaikan"), {
        nama,
        lokasi,
        deskripsi,
        status: "Menunggu", // default status
        tanggalLapor: new Date()
      });
      alert("Laporan berhasil dikirim!");
      setNama("");
      setLokasi("");
      setDeskripsi("");
    } catch (e) {
      console.error("Error menambahkan laporan: ", e);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Form Laporan Perbaikan
      </Text>

      <Text>Nama Warga:</Text>
      <TextInput
        value={nama}
        onChangeText={setNama}
        placeholder="Masukkan nama"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Lokasi Kerusakan:</Text>
      <TextInput
        value={lokasi}
        onChangeText={setLokasi}
        placeholder="Masukkan lokasi"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Deskripsi Kerusakan:</Text>
      <TextInput
        value={deskripsi}
        onChangeText={setDeskripsi}
        placeholder="Masukkan deskripsi"
        multiline
        style={{ borderWidth: 1, marginBottom: 10, padding: 5, height: 80 }}
      />

      <Button title="Kirim Laporan" onPress={laporPerbaikan} />
    </View>
  );
};

export default FormPerbaikan;
