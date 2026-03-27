
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// Fungsi untuk update status
const updateStatusPerbaikan = async (id, statusBaru) => {
  try {
    const perbaikanRef = doc(db, "perbaikan", id);
    await updateDoc(perbaikanRef, {
      status: statusBaru,
      tanggalUpdate: new Date()
    });
    alert("Status perbaikan berhasil diperbarui!");
  } catch (e) {
    console.error("Error update status: ", e);
  }
};
