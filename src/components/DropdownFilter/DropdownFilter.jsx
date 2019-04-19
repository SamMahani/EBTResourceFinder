import React from "react";
import "./DropdownFilter.css";

const DropdownFilter = ({ value, handleChange }) => (
  <select
    className="dropdown"
    onBlur={handleChange}
    value={value}
    onChange={handleChange}
  >
    <option value="markets">market</option>
    <option value="foodbanks">foodbank</option>
    <option value="snapoffices">snapoffice</option>
    <option value="wicoffices">wicoffice</option>
    <option value="stores">store</option>
  </select>
);

export default DropdownFilter;
