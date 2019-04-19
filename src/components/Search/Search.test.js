import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import Search from "./index.js";

afterEach(cleanup);

it("renders", () => {
  const { asFragment, getByText } = render(<Search />);
  expect(asFragment()).toMatchSnapshot();
  expect(getByText("Zip:")).toHaveClass("labelWrapper");
});
