import React from "react";
import axios from "axios";
import GMA from "../../../GMA.json";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
    this.handleSearchValue = this.handleSearchValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        this.props.handleLatLongState(lat, lng);
        this.props.getLocations();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <form>
        <label>
          Zip:
          <input
            type="text"
            value={this.state.searchValue}
            onChange={this.handleSearchValue}
            name="zip"
          />
        </label>
        <input type="submit" value="Submit" onClick={this.handleSubmit} />
      </form>
    );
  }
}

export default Search;
