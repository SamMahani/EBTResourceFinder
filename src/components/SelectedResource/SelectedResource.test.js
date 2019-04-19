import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import SelectedResource from "./index.js";

afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<SelectedResource />);
  expect(asFragment()).toMatchSnapshot();
});

it("inserts text into SelectedResource divs", () => {
  let selectedMarker = {
    title: "Staten Island Mall Greenmarket",
    store: {
      address: "Richmond Ave Entrance (Parking Lot)",
      city: "Staten Island",
      hoursHtml: "06/15/2013 to 11/23/2013<br/>Sat: 8:00 AM-3:00 PM<br/>",
      icon:
        "https://s3-us-west-2.amazonaws.com/prod.ad-images/House/Map/market-icon.png",
      iconSelected:
        "https://s3-us-west-2.amazonaws.com/prod.ad-images/House/Map/market-selected-icon.png",
      latitude: 40.603429,
      longitude: -74.162908,
      store_name: "Staten Island Mall Greenmarket",
      type: "market",
      zip5: "10314"
    }
  };
  const { getByTestId, getByText } = render(
    <SelectedResource selectedMarker={selectedMarker} />
  );
  expect(getByTestId("selectedTitleTest")).toHaveTextContent(
    "Staten Island Mall Greenmarket"
  );
  expect(getByText("Staten Island Mall Greenmarket")).toHaveClass(
    "selectedMarkerTitle"
  );
  expect(getByTestId("selectedAddressTest")).toHaveTextContent(
    "Richmond Ave Entrance (Parking Lot)"
  );
  expect(getByTestId("selectedCityZipTest")).toHaveTextContent(
    "Staten Island, 10314"
  );
});
