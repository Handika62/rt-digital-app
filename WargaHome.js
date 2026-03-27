import React from "react";
import { View, Button, Text } from "react-native";

const WargaHome = ({ navigation }) => (
  <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
    <Text style={{ fontSize:20, fontWeight:"bold", marginBottom:20 }}>Menu Warga</Text>
    <Button title="Laporkan Perbaikan" onPress={() => navigation.navigate("FormPerbaikan")} />
    <Button title="Cek Status Perbaikan" onPress={() => navigation.navigate("DashboardPerbaikan")} />
    <Button title="Cek Iuran Sampah" onPress={() => navigation.navigate("DashboardIuran")} />
  </View>
);

export default WargaHome;
