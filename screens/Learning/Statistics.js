import React from "react";
import { View, StyleSheet, Text, StatusBar, Pressable } from "react-native";
import { COLORS } from "../../constants";
import StatisticsInfo from "../../components/StatisticsInfo";
import ImagePile from "../../components/ImagePile";

export default function Statistics() {
  return (
    <View style={styles.container}>
      <StatisticsInfo />
      <ImagePile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    // flexDirection: "row",
    // marginVertical: 6,
    // marginHorizontal: 5,
    // alignItems: "center",
    // paddingHorizontal: 5,
    // borderRadius: 8,
    // elevation: 4,
  },
  text: {
    color: COLORS.fontMain,
  },
});
