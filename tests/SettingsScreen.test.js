import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react-native";
import { COLORS, COLORS_LIGHT } from "../constants";
import Settings from "../screens/Settings";

afterEach(() => {
  jest.useRealTimers();
});

test(`Dark theme is turned on by default`, async () => {
  render(<Settings />);

  const switchElement = screen.getByRole(`switch`);
  expect(switchElement.props.value).toBeTruthy();
});

test(`Text color is correct in dark theme`, async () => {
  render(<Settings />);

  const chooseColorText = screen.getByText(`Choose color theme:`);
  expect(chooseColorText).toHaveStyle({ color: COLORS.fontMain });

  const lightText = screen.getByText(`Choose color theme:`);
  expect(lightText).toHaveStyle({ color: COLORS.fontMain });

  const darkText = screen.getByText(`Choose color theme:`);
  expect(darkText).toHaveStyle({ color: COLORS.fontMain });
});

test(`Statistics menu item uses Statistics component `, async () => {
  render(<Settings />);

  const switchElement = screen.getByRole(`switch`);

  fireEvent(switchElement, "valueChange", false);
  expect(switchElement.props.value).toBeFalsy();

  const chooseColorText = screen.getByText(`Choose color theme:`);
  expect(chooseColorText).toHaveStyle({ color: COLORS.fontInverse });

  const lightText = screen.getByText(`Choose color theme:`);
  expect(lightText).toHaveStyle({ color: COLORS.fontInverse });

  const darkText = screen.getByText(`Choose color theme:`);
  expect(darkText).toHaveStyle({ color: COLORS.fontInverse });
});

test(`Container View has dark background when dark theme is selected `, async () => {
  render(<Settings />);

  const switchElement = screen.getByRole(`switch`);

  const chooseColorText = screen.getByText(`Choose color theme:`);
  expect(chooseColorText.parent.parent.props.style).toContainEqual({
    backgroundColor: COLORS.appBackground,
  });
});

test(`Container View has light background when light theme is selected `, async () => {
  render(<Settings />);

  const switchElement = screen.getByRole(`switch`);

  fireEvent(switchElement, "valueChange", false);
  expect(switchElement.props.value).toBeFalsy();

  const chooseColorText = screen.getByText(`Choose color theme:`);
  expect(chooseColorText.parent.parent.props.style).toContainEqual({
    backgroundColor: COLORS_LIGHT.appBackground,
  });
});
