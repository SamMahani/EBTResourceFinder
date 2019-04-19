import React from "react";
import "./SelectedResource.css";

const SelectedResource = ({ selectedMarker }) => {
  return (
    <section>
      {selectedMarker ? (
        <div className="selectedWrapper">
          <div data-testid="selectedTitleTest" className="selectedMarkerTitle">
            {selectedMarker.title}
          </div>
          <div data-testid="selectedAddressTest">
            {selectedMarker.store.address}
          </div>
          <div data-testid="selectedCityZipTest">
            {selectedMarker.store.zip5
              ? `${selectedMarker.store.city}, ${selectedMarker.store.zip5}`
              : selectedMarker.store.city}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default SelectedResource;
