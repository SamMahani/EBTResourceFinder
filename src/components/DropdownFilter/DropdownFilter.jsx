import React from "react";

const DropdownFilter = ({ value, handleChange }) => (
  <select value={value} onChange={handleChange}>
    <option value="stores">store</option>
    <option value="markets">market</option>
    <option value="foodbanks">foodbank</option>
    <option value="snapoffices">snapoffice</option>
    <option value="wicoffices">wicoffice</option>
  </select>
);

export default DropdownFilter;
