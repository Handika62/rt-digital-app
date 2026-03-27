import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Login";
import AdminHome from "./AdminHome";
import WargaHome from "./WargaHome";
import DashboardPerbaikan from "./Dashboard";
import DashboardIuran from "./DashboardIuran";
import FormInputIuran from "./FormInputIuran";
import FormPerbaikan from "./FormPerbaikan"; // form laporan warga

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
        <Stack.Screen name="AdminHome" component={AdminHome} options={{ title: "Menu Admin" }} />
        <Stack.Screen name="WargaHome" component={WargaHome} options={{ title: "Menu Warga" }} />
        <Stack.Screen name="DashboardPerbaikan" component={DashboardPerbaikan} />
        <Stack.Screen name="DashboardIuran" component={DashboardIuran} />
        <Stack.Screen name="FormInputIuran" component={FormInputIuran} />
        <Stack.Screen name="FormPerbaikan" component={FormPerbaikan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
