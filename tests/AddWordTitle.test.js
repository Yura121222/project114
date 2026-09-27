import { render, screen, userEvent, act } from "@testing-library/react-native";

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return ({ name }) => <Text>{name}</Text>; 
});

const mockedSetOptions = jest.fn();

import AddWord from "../screens/Words/AddWord";
import * as wordsService from "../services/wordsHandler";

test("title of AddWord is changing according to requirement", async () => {
  jest.spyOn(wordsService, "getWordInfo").mockImplementationOnce(() => ({
    word: "hello",
    phonetic: "həˈləʊ",
    audio:
      "https://ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3",
    meaning: "used as a greeting or to begin a phone conversation.",
  }));
  const user = userEvent.setup();
  jest.useFakeTimers();

  render(<AddWord navigation={{ setOptions: mockedSetOptions }} />);

  expect(mockedSetOptions).toHaveBeenCalledTimes(1);
  expect(mockedSetOptions.mock.lastCall[0]).toEqual({ title: "Adding word" });

  const input = screen.getByPlaceholderText("type here..");
  await act(async () => {
    await user.type(input, "hello");
    jest.runAllTimers();
  });

  expect(mockedSetOptions).toHaveBeenCalledTimes(2);
  expect(mockedSetOptions.mock.lastCall[0]).toEqual({ title: "Adding word \"hello\"" });

  await act(async () => {
    await user.clear(input);
    jest.runAllTimers();
  });

  expect(mockedSetOptions).toHaveBeenCalledTimes(3);
  expect(mockedSetOptions.mock.lastCall[0]).toEqual({ title: "Adding word" });

  jest.spyOn(wordsService, "getWordInfo").mockImplementationOnce(() => ({
    partOfSpeech: "not found",
    meaning: "we couldn't find the definition",
  }));

  expect(mockedSetOptions).toHaveBeenCalledTimes(3);
  expect(mockedSetOptions.mock.lastCall[0]).toEqual({ title: "Adding word" });
});
