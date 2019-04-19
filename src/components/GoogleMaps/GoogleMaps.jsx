import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
require("dotenv").config();

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: {}
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(selectedPlace) {
    this.props.handleSelectedMarker(selectedPlace);
  }

  render() {
    let points = this.props.list.reduce((acc, store) => {
      let lat = Number(store.latitude);
      let lng = Number(store.longitude);
      let coordinate = { lat, lng };
      acc.push(coordinate);
      return acc;
    }, []);
    var bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < points.length; i++) {
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
              onClick={this.onMarkerClick}
              name={store.store_name}
              store={store}
              title={store.store_name}
              position={{ lat: store.latitude, lng: store.longitude }}
              icon={
                store.icon
                  ? {
                      url: store.icon,
                      anchor: new google.maps.Point(32, 32),
                      scaledSize: new google.maps.Size(24, 24)
                    }
                  : null
              }
              key={`${store.address}_${store.latitude}_${
                store.longitude
              }${Math.random()}`}
            />
          );
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GMA
})(MapContainer);
