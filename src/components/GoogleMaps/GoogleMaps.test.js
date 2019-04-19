import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import GoogleMaps from "./GoogleMaps.jsx";

afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<GoogleMaps />);
  expect(asFragment()).toMatchSnapshot();
});
