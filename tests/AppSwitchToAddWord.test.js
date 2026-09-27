import { render, screen, userEvent, act } from "@testing-library/react-native";
import App from "../App";

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return ({ name }) => <Text>{name}</Text>;
});

jest.mock("../screens/Words/AddWord", () => {
  const { Text } = require("react-native");
  return () => <Text>AddWord</Text>;
});

afterEach(() => {
  jest.useRealTimers();
});

test("AddWord screen is shown after click on '+' button", async () => {
  const user = userEvent.setup();
  jest.useFakeTimers();

  render(<App />);
  const addButton = screen.getByText("add-outline");
  let addWord = screen.queryByText("AddWord");
  expect(addWord).not.toBeOnTheScreen();

  await act(async () => {
    await user.press(addButton);
    jest.runAllTimers();
  });

  addWord = screen.getByText("AddWord");
  expect(addWord).toBeOnTheScreen();
});
