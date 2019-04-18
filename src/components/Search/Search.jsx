import React from "react";

const Search = () => {
  return (
    <form>
      <label>
        Zip:
        <input type="text" name="zip" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Search;
