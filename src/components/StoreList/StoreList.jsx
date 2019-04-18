import React from "react";

const StoreList = ({ list }) => {
  return (
    <div>
      <ul>
        {list.map(store => {
          return (
            <li key={`${store.latitude}_${store.longitude}${Math.random()}`}>
              {store.store_name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StoreList;
