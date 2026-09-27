import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "./constants";
import { StatusBar } from "react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <StatusBar
      backgroundColor={COLORS.appBackground}
      barStyle="light-content"
    />
  );
}
