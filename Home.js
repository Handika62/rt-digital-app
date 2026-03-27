        onPress={() => navigation.navigate("DashboardIuran")} />
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 30 }}>
        Menu Utama RT Digital
      </Text>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          padding: 10,
          backgroundColor: "#e0f7fa",
          borderRadius: 8,
        }}
        onPress={() => navigation.navigate("DashboardPerbaikan")}
      >
        <Icon name="tools" size={24} color="#00796b" />
        <Text style={{ marginLeft: 10, fontSize: 16 }}>Dashboard Perbaikan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#fff3e0",
          borderRadius: 8,
        }}
        onPress={() => navigation.navigate("DashboardIuran")}
      >
        <Icon name="cash" size={24} color="#e65100" />
        <Text style={{ marginLeft: 10, fontSize: 16 }}>Dashboard Iuran</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
