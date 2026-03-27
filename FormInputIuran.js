import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const FormInputIuran = () => {
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [bulan, setBulan] = useState("");

  const simpanIuran = async () => {
    try {
      await addDoc(collection(db, "iuran_sampah"), {
        nama,
        jumlah: parseInt(jumlah),
        bulan,
        tanggalBayar: new Date()
      });
      alert("Iuran berhasil ditambahkan!");
      setNama("");
      setJumlah("");
      setBulan("");
    } catch (e) {
      console.error("Error menambahkan dokumen: ", e);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Form Input Iuran</Text>

      <Text>Nama Warga:</Text>
      <TextInput
        value={nama}
        onChangeText={setNama}
        placeholder="Masukkan nama"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Jumlah (Rp):</Text>
      <TextInput
        value={jumlah}
        onChangeText={setJumlah}
        placeholder="Masukkan jumlah"
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Bulan:</Text>
      <TextInput
        value={bulan}
        onChangeText={setBulan}
        placeholder="Contoh: Maret 2026"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Button title="Simpan Iuran" onPress={simpanIuran} />
    </View>
  );
};

export default FormInputIuran;
