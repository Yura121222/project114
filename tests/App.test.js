import { render, screen, userEvent, act } from "@testing-library/react-native";
import App from "../App";
import * as wordsService from "../services/wordsHandler";

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return ({ name }) => <Text>{name}</Text>; 
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
  jest.useRealTimers();
});

test("User can add a word", async () => {
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
  expect(wordsService.getWordInfo).toHaveBeenCalledWith("hello");

  const addWordButton = await screen.findByText("Add");
  await act(async () => await user.press(addWordButton));
  await act(() => {
    jest.runAllTimers();
  });
  const wordText = screen.getByText("hello");
  const explanationText = screen.getByText(
    "used as a greeting or to begin a phone conversation."
  );

  expect(wordText).toBeOnTheScreen();
  expect(explanationText).toBeOnTheScreen();
});

test("User can edit a word", async () => {
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

  const explanationInput = screen.getByDisplayValue(
    "used as a greeting or to begin a phone conversation."
  );

  const newExplanationValue = "new explanation";
  await act(async () => {
    await user.clear(explanationInput);
    await user.type(explanationInput, newExplanationValue);
    jest.runAllTimers();
  });

  const saveButton = await screen.findByText("Save");
  await act(async () => {
    await user.press(saveButton);
    jest.runAllTimers();
  });

  const newExplanationText = screen.getByText(newExplanationValue);

  expect(wordText).toBeOnTheScreen();
  expect(explanationInput).not.toBeOnTheScreen();
  expect(newExplanationText).toBeOnTheScreen();
});
