import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import App from "./index.js";

afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

describe("Text in App component", () => {
  it("should contain a title name", () => {
    const { getByTestId, getByText } = render(<App />);
    expect(getByTestId("titleTest")).toHaveTextContent("EBT Resource Finder");

    expect(getByText("EBT Resource Finder")).toHaveClass("title");
  });
});
