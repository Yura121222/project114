import { render, screen } from "@testing-library/react-native";

jest.mock(
  "@react-navigation/native-stack",
  () => ({
    createNativeStackNavigator: () => {
      const { Text } = require("react-native");
      return {
        Navigator: ({ screenOptions, children }) => (
          <>
            <Text>{JSON.stringify(screenOptions)}</Text>
            <Text>{children}</Text>
          </>
        ),
        Screen: ({ options, name }) => (
          <Text testID={name}>
            {typeof options !== "function"
              ? options?.title
              : options({ route: { params: { wordData: { word: "test" } } } })
                  .title}
          </Text>
        ),
      };
    },
  })
);

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return ({ name }) => <Text>{name}</Text>; 
});


import App from "../App";

test(`EditWord is configured with title 'Editing word "specificWord"'`, async () => {
  render(<App />);

  const word = screen.getByTestId(`EditWord`, {
    exact: false,
  });
  expect(word).toHaveTextContent(`Editing word "test"`, {
    exact: false,
  });
});
