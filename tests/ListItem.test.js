import { render, screen, userEvent, act } from "@testing-library/react-native";

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return ({ name }) => <Text>{name}</Text>;
});

const mockedNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

import App from "../App";
import * as wordsService from "../services/wordsHandler";

test("press on word calls navigation.navigate", async () => {
  jest.spyOn(wordsService, "getWordInfo").mockImplementationOnce(() => ({
    word: "hello",
    phonetic: "həˈləʊ",
    audio:
      "https://ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3",
    meaning: "used as a greeting or to begin a phone conversation.",
  }));
  const user = userEvent.setup();
  jest.useFakeTimers();
  render(<App />);
  const addButton = screen.getByText("add-outline");
  await act(async () => {
    await user.press(addButton);
    jest.runAllTimers();
  });
  const input = screen.getByPlaceholderText("type here..");
  await act(async () => {
    await user.type(input, "hello");
    jest.runAllTimers();
  });

  const addWordButton = await screen.findByText("Add");
  await act(async () => {
    await user.press(addWordButton);
    jest.runAllTimers();
  });
  const wordText = screen.getByText("hello");

  await act(async () => {
    await user.press(wordText);
    jest.runAllTimers();
  });

  expect(mockedNavigate).toHaveBeenCalledTimes(1);
});
