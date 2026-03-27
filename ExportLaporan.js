import React, { useState, useEffect } from "react";
import { View, Button, TextInput } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const ExportLaporan = () => {
  const [bulanFilter, setBulanFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const exportExcel = async () => {
    // Query iuran dengan filter bulan
    let iuranQuery = collection(db, "iuran_sampah");
    if (bulanFilter) {
      iuranQuery = query(iuranQuery, where("bulan", "==", bulanFilter));
    }
    const iuranSnap = await getDocs(iuranQuery);
    const iuran = iuranSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Query laporan perbaikan dengan filter status
    let laporanQuery = collection(db, "laporan_perbaikan");
    if (statusFilter) {
      laporanQuery = query(laporanQuery, where("status", "==", statusFilter));
    }
    const laporanSnap = await getDocs(laporanQuery);
    const laporan = laporanSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Sheet Iuran
    const iuranData = iuran.map((item) => ({
      Nama: item.nama,
      Bulan: item.bulan,
      Jumlah: item.jumlah,
      Status: item.jumlah > 0 ? "Sudah Bayar" : "Belum Bayar",
      TanggalBayar: item.tanggalBayar
        ? new Date(item.tanggalBayar.seconds * 1000).toLocaleDateString()
        : "",
    }));

    // Sheet Perbaikan
    const laporanData = laporan.map((item) => ({
      Nama: item.nama,
      Lokasi: item.lokasi,
      Deskripsi: item.deskripsi,
      Status: item.status,
      TanggalLapor: item.tanggalLapor
        ? new Date(item.tanggalLapor.seconds * 1000).toLocaleDateString()
        : "",
    }));

    // Buat workbook
    const wb = XLSX.utils.book_new();
    const wsIuran = XLSX.utils.json_to_sheet(iuranData);
    const wsPerbaikan = XLSX.utils.json_to_sheet(laporanData);

    XLSX.utils.book_append_sheet(wb, wsIuran, "Iuran Sampah");
    XLSX.utils.book_append_sheet(wb, wsPerbaikan, "Laporan Perbaikan");

    // Simpan file
    const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });
    const fileUri = FileSystem.documentDirectory + "laporan_rt_filtered.xlsx";
    await FileSystem.writeAsStringAsync(fileUri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Bagikan file
    await Sharing.shareAsync(fileUri);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Filter bulan iuran (contoh: Maret 2026)"
        value={bulanFilter}
        onChangeText={setBulanFilter}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Filter status perbaikan (Menunggu/Diproses/Selesai)"
        value={statusFilter}
        onChangeText={setStatusFilter}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Export Laporan Gabungan (Excel)" onPress={exportExcel} />
    </View>
  );
};

export default ExportLaporan;
