import React from "react";

const Search = ({ handleSubmit, searchValue, handleSearchValue }) => {
  return (
    <form>
      <label>
        Zip:
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchValue}
          name="zip"
        />
      </label>
      <input type="submit" value="Submit" onClick={handleSubmit} />
    </form>
  );
};

export default Search;
