import React from "react";
import axios from "axios";
import "./App.css";
import StoreList from "../StoreList";
import Search from "../Search";
import DropdownFilter from "../DropdownFilter";
import GoogleMaps from "../GoogleMaps/GoogleMaps.jsx";
import GMA from "../../../GMA.json";

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
      value: "stores",
      searchValue: "",
      currLat: 40.70851,
      currLong: -73.90896
    };
    this.getLocations = this.getLocations.bind(this);
    this.filterStoreByType = this.filterStoreByType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchValue = this.handleSearchValue.bind(this);
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

  handleSearchValue(e) {
    this.setState({
      searchValue: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${
      this.state.searchValue
    }&key=${GMA.GMA}`;
    axios
      .get(endpoint)
      .then(locData => {
        const { lat, lng } = locData.data.results[0].geometry.location;
        this.setState({
          currLat: lat,
          currLong: lng
        });
        this.getLocations();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <header>EBT Resource Finder</header>
        <Search
          handleSubmit={this.handleSubmit}
          searchValue={this.state.searchValue}
          handleSearchValue={this.handleSearchValue}
        />
        <DropdownFilter
          value={this.state.value}
          handleChange={this.handleChange}
        />
        <GoogleMaps
          list={this.state[this.state.value]}
          currLat={this.state.currLat}
          currLong={this.state.currLong}
        />
        <StoreList list={this.state[this.state.value]} />
      </div>
    );
  }
}

export default App;
