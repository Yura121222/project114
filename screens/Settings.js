import { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

import { COLORS, COLORS_LIGHT } from "../constants";

function Settings() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const palette = isDarkTheme ? COLORS : COLORS_LIGHT;

  return (
    <View
      style={[styles.container, { backgroundColor: palette.appBackground }]}
    >
      <View
        style={[styles.optionWrapper, { backgroundColor: palette.appBackground }]}
      >
        <Text style={[styles.label, { color: isDarkTheme ? COLORS.fontMain : COLORS.fontInverse }]}>
          Choose color theme:
        </Text>
        <Switch
          value={isDarkTheme}
          onValueChange={setIsDarkTheme}
          accessibilityRole="switch"
          trackColor={{
            false: COLORS_LIGHT.primary300,
            true: COLORS.primary300,
          }}
          thumbColor={isDarkTheme ? COLORS.primary900 : COLORS_LIGHT.primary900}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: "center",
  },
  optionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 20,
  },
});

export default Settings;
