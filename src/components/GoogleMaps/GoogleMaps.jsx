import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import GMA from "../../../GMA.json";
export class MapContainer extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={{
          lat: this.props.currLat,
          lng: this.props.currLong
        }}
        zoom={12}
      >
        {this.props.list.map(store => {
          return (
            <Marker
              title={store.store_name}
              name={store.store_name}
              position={{ lat: store.latitude, lng: store.longitude }}
              key={`${store.address}_${store.latitude}_${
                store.longitude
              }${Math.random()}`}
            />
          );
        })}

        {/* <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1 />
          </div>
        </InfoWindow> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GMA.GMA
})(MapContainer);
