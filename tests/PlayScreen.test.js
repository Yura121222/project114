import {
  render,
  screen,
  userEvent,
  act,
} from "@testing-library/react-native";
import Play from "../screens/Learning/Play";
import MyWords from "./testData.js";

afterEach(() => {
  jest.useRealTimers();
});

test(`The first word is shown on the screen, 
  phonetics and meaning are not shown at the start`, async () => {
  render(<Play words={[{ ...MyWords[0] }]} />);

  const helloText = screen.getByText(MyWords[0].word);
  const meaningText = screen.queryByText(MyWords[0].meaning);
  const meaningPhonetics = screen.queryByText(MyWords[0].phonetics);
  expect(helloText).toBeOnTheScreen();
  expect(meaningText).not.toBeOnTheScreen();
  expect(meaningPhonetics).not.toBeOnTheScreen();
});

test(`The first word along with phonetics and meaning are shown on the screen after press `, async () => {
  render(<Play words={[{ ...MyWords[0] }]} />);
  const user = userEvent.setup();
  jest.useFakeTimers();
  const helloText = screen.getByText(MyWords[0].word);
  await act(async () => {
    await user.press(helloText);
    jest.runAllTimers();
  });
  const meaningText = screen.getByText(MyWords[0].meaning);
  const meaningPhonetics = screen.getByText(MyWords[0].phonetics);
  expect(helloText).toBeOnTheScreen();
  expect(meaningText).toBeOnTheScreen();
  expect(meaningPhonetics).toBeOnTheScreen();
});

test(`Word does not disappear from the play if user clicks 'Didn't know it' 3 times`, async () => {
  render(<Play words={[{ ...MyWords[0] }]} />);
  const user = userEvent.setup();
  jest.useFakeTimers();
  let helloText = screen.getByText(MyWords[0].word);
  await act(async () => {
    await user.press(helloText);
    jest.runAllTimers();
  });
  let doNotRememberButton = screen.getByText("Didn't know it");
  await act(async () => {
    await user.press(doNotRememberButton);
    jest.runAllTimers();
  });
  helloText = screen.getByText(MyWords[0].word);
  await act(async () => {
    await user.press(helloText);
    jest.runAllTimers();
  });
  doNotRememberButton = screen.getByText("Didn't know it");
  await act(async () => {
    await user.press(doNotRememberButton);
    jest.runAllTimers();
  });
  helloText = screen.getByText(MyWords[0].word);
  await act(async () => {
    await user.press(helloText);
    jest.runAllTimers();
  });
  doNotRememberButton = screen.getByText("Didn't know it");
  await act(async () => {
    await user.press(doNotRememberButton);
    jest.runAllTimers();
  });

  helloText = screen.getByText(MyWords[0].word);
  expect(helloText).toBeOnTheScreen();
});

test(`Word disappears from the play if user clicks 'Knew it' 2 times`, async () => {
  render(<Play words={[{ ...MyWords[0] }]} />);
  const user = userEvent.setup();
  jest.useFakeTimers();
  let helloText = screen.getByText(MyWords[0].word);
  await act(async () => {
    await user.press(helloText);
    jest.runAllTimers();
  });
  let rememberButton = screen.getByText("Knew it");
  await act(async () => {
    await user.press(rememberButton);
    jest.runAllTimers();
  });
  helloText = screen.getByText(MyWords[0].word);
  await act(async () => {
    await user.press(helloText);
    jest.runAllTimers();
  });
  rememberButton = screen.getByText("Knew it");
  await act(async () => {
    await user.press(rememberButton);
    jest.runAllTimers();
  });

  helloText = screen.queryByText(MyWords[0].word);
  const congratsText = screen.getByText("Congrats!");
  expect(helloText).not.toBeOnTheScreen();
  expect(congratsText).toBeOnTheScreen();
});

test(`Shows card with the second word after the first one`, async () => {
  render(<Play words={[{ ...MyWords[0] }, { ...MyWords[1] }]} />);
  const user = userEvent.setup();
  jest.useFakeTimers();
  const zerothWordText = screen.getByText(MyWords[0].word);
  await act(async () => {
    await user.press(zerothWordText);
    jest.runAllTimers();
  });
  let rememberButton = screen.getByText("Knew it");
  await act(async () => {
    await user.press(rememberButton);
    jest.runAllTimers();
  });
  const firstWordText = screen.getByText(MyWords[1].word);
  expect(firstWordText).toBeOnTheScreen();
});
