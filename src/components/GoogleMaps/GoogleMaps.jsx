import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import GMA from "../../../GMA.json";
export class MapContainer extends React.Component {
  render() {
    let points = this.props.list.reduce((acc, store) => {
      let lat = Number(store.latitude);
      let lng = Number(store.longitude);
      let coordinate = {
        lat,
        lng
      };
      acc.push(coordinate);
      return acc;
    }, []);
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    return (
      <Map
        google={this.props.google}
        center={{
          lat: this.props.currLat,
          lng: this.props.currLong
        }}
        bounds={bounds}
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
