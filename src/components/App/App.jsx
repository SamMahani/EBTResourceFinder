import "./App.css";
import React from "react";
import axios from "axios";
import StoreList from "../StoreList";
import Search from "../Search";
import DropdownFilter from "../DropdownFilter";
import GoogleMaps from "../GoogleMaps/GoogleMaps.jsx";
import SelectedResource from "../SelectedResource";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nearbyStores: [],
      filters: [],
      stores: [],
      markets: [],
      foodbanks: [],
      snapoffices: [],
      wicoffices: [],
      value: "markets",
      currLat: 40.70851,
      currLong: -73.90896
    };
    this.getLocations = this.getLocations.bind(this);
    this.filterStoreByType = this.filterStoreByType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLatLongState = this.handleLatLongState.bind(this);
    this.handleSelectedMarker = this.handleSelectedMarker.bind(this);
  }

  componentDidMount() {
    this.getLocations();
  }

  getLocations() {
    const endpoint = `https://www.easyfoodstamps.com/stores?latitude=${
      this.state.currLat
    }&longitude=${this.state.currLong}`;
    axios
      .get(endpoint)
      .then(locations => {
        let nearbyStores = locations.data.stores;
        this.filterStoreByType(nearbyStores);
        this.setState({
          nearbyStores,
          filters: locations.data.filters,
          currLat: this.state.currLat,
          currLong: this.state.currLong
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  filterStoreByType(nearByStores) {
    let stores = [];
    let markets = [];
    let foodbanks = [];
    let snapoffices = [];
    let wicoffices = [];
    nearByStores.forEach(store => {
      if (store.type === "market") {
        markets.push(store);
      } else if (store.type === "foodbank") {
        foodbanks.push(store);
      } else if (store.type === "snapoffice") {
        snapoffices.push(store);
      } else if (store.type === "wicoffice") {
        wicoffices.push(store);
      } else {
        stores.push(store);
      }
    });
    this.setState({
      stores,
      markets,
      foodbanks,
      snapoffices,
      wicoffices
    });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleLatLongState(lat, lng) {
    this.setState({
      currLat: lat,
      currLong: lng
    });
  }

  handleSelectedMarker(selectedMarker) {
    this.setState({
      selectedMarker
    });
  }

  render() {
    return (
      <div className="appWrapper">
        <header data-testid="titleTest" className="title">
          EBT Resource Finder
        </header>
        <div className="searchWrapper">
          <Search
            getLocations={this.getLocations}
            handleLatLongState={this.handleLatLongState}
          />
        </div>
        <div className="dropdownWrapper">
          <DropdownFilter
            value={this.state.value}
            handleChange={this.handleChange}
          />
        </div>
        <section className="selectedMarkerWrap">
          <SelectedResource selectedMarker={this.state.selectedMarker} />
        </section>
        <section className="googleMapsWrapper">
          <GoogleMaps
            handleSelectedMarker={this.handleSelectedMarker}
            list={this.state[this.state.value]}
            currLat={this.state.currLat}
            currLong={this.state.currLong}
          />
        </section>
        <div className="storeListWrapper">
          <StoreList list={this.state[this.state.value]} />
        </div>
      </div>
    );
  }
}

export default App;
