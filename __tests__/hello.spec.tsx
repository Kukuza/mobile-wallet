import React from "react";
import { render } from "@testing-library/react-native";
import Hello from "../Hello";

describe("Hello", () => {
  it("renders the correct message", () => {
    const { queryByText } = render(<Hello />);
    expect(queryByText("Hello, world!")).not.toBeNull();
  });
});
