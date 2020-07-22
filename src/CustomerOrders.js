import React from "react";

import ordersList from "./Resources/orders.json";

const CustomerOrders = (props) => {
  let res = [];
  let allOrders = [...getLS(), ...ordersList];
  if (JSON.stringify(allOrders).indexOf(props.cId.toString()) > -1)
    res = allOrders.filter((el) => {
      return el["Customer ID"] === props.cId;
    });

  return (
    <div className="past">
      {res.map((el, index) => {
        if (index < 10) return <div> {el["Item Name"]}</div>;
        return "";
      })}
      {res.length === 0 && <div> No Past Orders</div>}
    </div>
  );
};

const getLS = () => {
  let currData = localStorage.getItem("order_data");
  if (currData) currData = JSON.parse(currData);
  else currData = [];
  return currData;
};

export default CustomerOrders;
