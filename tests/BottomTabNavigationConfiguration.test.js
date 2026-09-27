import { render, screen } from "@testing-library/react-native";
import { COLORS } from "../constants";

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return ({ name, color, size }) => <Text style={{ color, fontSize: size }}>{name}</Text>;
});

jest.mock("../components/WordsNavigation", () => () => "WordsNavigationMock");
jest.mock(
  "../components/LearningNavigation",
  () => () => "LearningNavigationMock"
);
jest.mock("../screens/Settings", () => () => "SettingsMock");

jest.mock("@react-navigation/bottom-tabs", () => ({
  createBottomTabNavigator: () => {
    const { Text } = require("react-native");
    const { COLORS } = require("../constants");
    return {
      Navigator: ({ screenOptions, children }) => (
        <>
          <Text testID={"container"}>{JSON.stringify(screenOptions)}</Text>
          <Text>{children}</Text>
        </>
      ),
      Screen: ({ options, name, component }) => (
        <>
          <Text testID={name}>{options?.headerShown?.toString()}</Text>
          <Text testID={name + "Icon"}>
            {options?.tabBarIcon({ color: COLORS.primary900, size: 15 })}
          </Text>
          <Text testID={name + "Component"}>{component()}</Text>
        </>
      ),
    };
  },
}));

import App from "../App";

test(`Words is configured with hidden header`, async () => {
  render(<App />);

  const word = screen.getByTestId(`Words`);
  expect(word).toHaveTextContent("false");
});

test(`Words tab uses WordsNavigation component `, async () => {
  render(<App />);

  const component = screen.getByTestId(`WordsComponent`);
  expect(component).toHaveTextContent("WordsNavigationMock");
});

test(`Words tab uses list-outline icon with color and size props`, async () => {
  render(<App />);

  const icon = screen.getByTestId(`WordsIcon`);
  expect(icon).toHaveTextContent("list-outline");
  expect(screen.getByText("list-outline")).toHaveStyle({
    color: COLORS.primary900,
    fontSize: 15,
  });
});

test(`Learning is configured with hidden header`, async () => {
  render(<App />);

  const word = screen.getByTestId(`Learning`);
  expect(word).toHaveTextContent("false");
});

test(`Learning tab uses LearningNavigation component `, async () => {
  render(<App />);

  const component = screen.getByTestId(`LearningComponent`);
  expect(component).toHaveTextContent("LearningNavigationMock");
});

test(`Learning tab uses book-outline icon with color and size props`, async () => {
  render(<App />);

  const component = screen.getByTestId(`LearningIcon`);
  expect(component).toHaveTextContent("book-outline");
  expect(screen.getByText("book-outline")).toHaveStyle({
    color: COLORS.primary900,
    fontSize: 15,
  });
});

test(`Settings tab uses Settings screen`, async () => {
  render(<App />);

  const component = screen.getByTestId(`SettingsComponent`);
  expect(component).toHaveTextContent("SettingsMock");
});

test(`Settings tab uses settings-outline icon  with color and size props`, async () => {
  render(<App />);

  const component = screen.getByTestId(`SettingsIcon`);
  expect(component).toHaveTextContent("settings-outline");
  expect(screen.getByText("settings-outline")).toHaveStyle({
    color: COLORS.primary900,
    fontSize: 15,
  });
});

test(`Active color is set correctly in one place for all tabs`, async () => {
  render(<App />);

  const container = screen.getByTestId(`container`);
  expect(container).toHaveTextContent(
    `"tabBarActiveTintColor":"${COLORS.primary900}"`,
    { exact: false }
  );  
});

test(`Tab background color is set correctly in one place for all tabs`, async () => {
  render(<App />);

  const container = screen.getByTestId(`container`);
  expect(container).toHaveTextContent(
    `"tabBarInactiveBackgroundColor":"${COLORS.appBackground}"`,
    { exact: false }
  );  
  expect(container).toHaveTextContent(
    `"tabBarActiveBackgroundColor":"${COLORS.appBackground}"`,
    { exact: false }
  );  
});

test(`Header background color is set correctly in one place for all tabs`, async () => {
  render(<App />);

  const container = screen.getByTestId(`container`);
  expect(container).toHaveTextContent(
    `"backgroundColor":"${COLORS.appBackground}"`,
    { exact: false }
  );    
});

test(`Header text color is set correctly in one place for all tabs`, async () => {
  render(<App />);

  const container = screen.getByTestId(`container`);
  expect(container).toHaveTextContent(
    `"headerTintColor":"${COLORS.primary900}"`,
    { exact: false }
  );    
});

test(`Header alignment is set correctly in one place for all tabs`, async () => {
  render(<App />);

  const container = screen.getByTestId(`container`);
  expect(container).toHaveTextContent(
    `"headerTitleAlign":"center"`,
    { exact: false }
  );    
});
