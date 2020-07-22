import React, { useState, useEffect } from "react";
import ordersList from "./Resources/orders.json";

const OrderDisplay = () => {
  const date = new Date();
  const currDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${(date.getUTCDate() + 1).toString().padStart(2, "0")}`;

  const [start, setStart] = useState("2020-01-01");
  const [end, setEnd] = useState(currDate);
  const [ordersInDuration, setOrdersInDuration] = useState([]);
  const [dates, considerDates] = useState(false);

  const setStartDate = (event) => {
    setStart(event.target.value);
  };
  const setEndDate = (event) => {
    setEnd(event.target.value);
  };
  const setDates = () => {
    considerDates(!dates);
  };

  useEffect(() => {
    if (dates) {
      let orders = [...getLS(), ...ordersList].filter((el) => {
        return el["Invoice Date"] >= start && el["Invoice Date"] <= end;
      });
      setOrdersInDuration(orders);
    }
  }, [dates]);
  return (
    <div>
      <div className="prodInput">
        <input
          type="date"
          id="start"
          onChange={setStartDate}
          value={start}
          min="2020-01-01"
          max={currDate}
        />
        <input
          type="date"
          id="end"
          onChange={setEndDate}
          value={end}
          min="2020-01-01"
          max={currDate}
        />
        <input
          type="button"
          onClick={setDates}
          className="button sub"
          value="Get Orders"
        />
      </div>
      <div className="df fdr flw spa">
        {ordersInDuration && (
          <>
            {ordersInDuration.map((el, i) => {
              if (i < 100)
                return (
                  <div className="prodCard">
                    <div>{el["Invoice ID"]}</div>
                    <div>{el["Invoice Number"]}</div>
                    <div>{el["Item Name"]}</div>
                    <div>{el["Item Total"]}</div>
                  </div>
                );
              return "";
            })}
          </>
        )}
      </div>
    </div>
  );
};

const getLS = () => {
  let currData = localStorage.getItem("order_data");
  if (currData) currData = JSON.parse(currData);
  else currData = [];
  return currData;
};

export default OrderDisplay;
