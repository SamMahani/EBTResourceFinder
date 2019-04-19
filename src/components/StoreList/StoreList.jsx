import React from "react";
import "./StoreList.css";

const StoreList = ({ list }) => {
  return (
    <section>
      {list
        ? list.map(store => (
            <article
              className="storeWrapper"
              key={`${store.latitude}_${store.longitude}${Math.random()}`}
            >
              <header data-testid="storeNameTest" className="storeNameHeader">
                {store.store_name}
              </header>
              <div className="address">{store.address}</div>
              <div className="city">{store.city}</div>
              <div />
            </article>
          ))
        : null}
    </section>
  );
};

export default StoreList;
