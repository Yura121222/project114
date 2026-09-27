import { createDrawerNavigator } from "@react-navigation/drawer";

import Statistics from "../screens/Learning/Statistics";
import Play from "../screens/Learning/Play";
import { COLORS } from "../constants";

const Drawer = createDrawerNavigator();

function LearningNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.appBackground },
        headerTintColor: COLORS.primary900,
        headerTitleAlign: "center",
        drawerStyle: { backgroundColor: COLORS.primary200 },
        drawerActiveTintColor: COLORS.primary100,
        drawerInactiveTintColor: COLORS.fontMain,
        drawerActiveBackgroundColor: COLORS.primary300,
      }}
    >
      <Drawer.Screen name="Statistics" component={Statistics} />
      <Drawer.Screen name="Play" component={Play} />
    </Drawer.Navigator>
  );
}

export default LearningNavigation;
