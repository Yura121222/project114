import { render, screen } from "@testing-library/react-native";
import { COLORS } from "../constants";

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return ({ name, color, size }) => <Text style={{ color, size }}>{name}</Text>;
});

jest.mock("../screens/Learning/Statistics", () => () => "StatisticsMock");
jest.mock("../screens/Learning/Play", () => () => "PlayMock");

jest.mock("@react-navigation/drawer", () => ({
  createDrawerNavigator: () => {
    const { Text } = require("react-native");
    return {
      Navigator: ({ screenOptions, children }) => (
        <>
          <Text testID={"container"}>{JSON.stringify(screenOptions)}</Text>
          <Text>{children}</Text>
        </>
      ),
      Screen: ({ name, component }) => (
          <Text testID={name}>{component()}</Text>
      ),
    };
  },
}));

import LearningNavigation from "../components/LearningNavigation";

test(`Statistics menu item uses Statistics component `, async () => {
  render(<LearningNavigation />);

  const component = screen.getByTestId(`Statistics`);
  expect(component).toHaveTextContent("StatisticsMock");
});

test(`Play menu item uses Play component `, async () => {
  render(<LearningNavigation />);

  const component = screen.getByTestId(`Play`);
  expect(component).toHaveTextContent("PlayMock");
});

test(`Header text color is set correctly in one place for all tabs`, async () => {
  render(<LearningNavigation />);

  const container = screen.getByTestId(`container`);
  expect(container).toHaveTextContent(
    `"headerTintColor":"${COLORS.primary900}"`,
    { exact: false }
  );    
});

test(`Header alignment is set correctly in one place for all tabs`, async () => {
  render(<LearningNavigation />);

  const container = screen.getByTestId(`container`);
  expect(container).toHaveTextContent(`"headerTitleAlign":"center"`, {
    exact: false,
  });
});

test(`Background color of drawer is set correctly in one place for all tabs`, async () => {
  render(<LearningNavigation />);

  const container = screen.getByTestId(`container`);
  expect(container).toHaveTextContent(
    `backgroundColor":"${COLORS.primary200}"`,
    {
      exact: false,
    }
  );  
});

test("Colors of drawer are set in one place for all tabs", async () => {
  render(<LearningNavigation />);

  const container = screen.getByTestId(`container`);
  expect(container).toHaveTextContent(`"drawerInactiveTintColor"`, {
    exact: false,
  });  
  expect(container).toHaveTextContent(`"drawerActiveTintColor"`, {
    exact: false,
  });  
  expect(container).toHaveTextContent(`"drawerActiveBackgroundColor"`, {
    exact: false,
  });  
});
