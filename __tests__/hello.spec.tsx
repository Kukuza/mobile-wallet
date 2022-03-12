import React from "react";
import { render } from "@testing-library/react-native";
import Hello from "../Hello";

describe("Hello", () => {
  it("renders the correct message testing github actions", () => {
    const { queryByText } = render(<Hello />);
    expect(queryByText("Hello, world!")).not.toBeNull();
  });
});
