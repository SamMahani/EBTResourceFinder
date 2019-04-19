import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import DropdownFilter from "./index.js";

afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<DropdownFilter />);
  expect(asFragment()).toMatchSnapshot();
});
