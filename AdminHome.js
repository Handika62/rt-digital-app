import React from "react";
import { View, Button, Text } from "react-native";

const AdminHome = ({ navigation }) => (
  <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
    <Text style={{ fontSize:20, fontWeight:"bold", marginBottom:20 }}>Menu Admin</Text>
    <Button title="Dashboard Perbaikan" onPress={() => navigation.navigate("DashboardPerbaikan")} />
    <Button title="Dashboard Iuran" onPress={() => navigation.navigate("DashboardIuran")} />
    <Button title="Form Input Iuran" onPress={() => navigation.navigate("FormInputIuran")} />
  </View>
);

export default AdminHome;
