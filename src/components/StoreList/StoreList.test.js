import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import StoreList from "./index.js";

afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<StoreList />);
  expect(asFragment()).toMatchSnapshot();
});
