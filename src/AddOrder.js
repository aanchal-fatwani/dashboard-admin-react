import React, { useState } from "react";

const AddOrder = (props) => {
  let date = new Date();
  let currDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${(date.getUTCDate() + 1).toString().padStart(2, "0")}`;
  const [orderData, setOrderData] = useState({
    "Invoice Date": currDate,
    "Invoice ID": "15782" + Date.now(),
    "Invoice Number": `EZM/19/${makeid(6)}`,
    "Invoice Status": "Open",
    "Customer Name": props.cNm ? props.cNm : "Admin",
    "Customer ID": props.cId ? props.cId : "000000000000000001",
    "Due Date": currDate,
    "Currency Code": "INR",
    "Exchange Rate": "1",
    Account: "Sales",
    "Product ID": "",
    "Item Name": "",
    "Item Desc": "",
    Quantity: "",
    "Usage unit": "",
    "Item Price": "",
    Discount: "0.00",
    "Discount Amount": "0.000",
    "Item Total": "",
    SubTotal: "",
    Total: "",
    "Shipping Charge": "20",
    Notes: "",
    "Terms & Conditions": "",
    "Billing Address": "",
    "Billing City": "",
    "Billing State": "",
    "Billing Country": "India",
    "Billing Code": "",
  });

  const [msg, setMsg] = useState("");
  const [contentEditted, setContentEditted] = useState(false);
  const submitHandler = (event) => {
    if (contentEditted) {
      setLS(orderData);
      setMsg("Order Details added succesfully..");
      setTimeout(() => setMsg(""), 2000);
    } else {
      setMsg("Add Order Details First..");
      setTimeout(() => setMsg(""), 2000);
    }
  };

  const inputHandler = (event) => {
    let orData = { ...orderData, [event.target.name]: event.target.value };
    setOrderData(orData);
    setContentEditted(true);
  };
  return (
    <div className="df fdc">
      <div className="prodInput df fdr flw">
        <input
          type="text"
          placeholder={orderData["Customer Name"]}
          name="Customer Name"
          value={orderData["Customer Name"]}
          disabled
        />
        <input
          type="text"
          placeholder={orderData["Customer ID"]}
          name="Customer ID"
          value={orderData["Customer ID"]}
          disabled
        />
        <input
          type="text"
          placeholder="Enter Item Name e.g Amul Full cream milk"
          name="Item Name"
          value={orderData["Item Name"]}
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter Quantity e.g 5"
          name="Quantity"
          value={orderData["Quantity"]}
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter Unit e.g pcs"
          name="Unit"
          value={orderData["Unit"]}
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter Billing Address"
          name="Billing Address"
          value={orderData["Billing Address"]}
          onChange={inputHandler}
        />
      </div>
      <div className="prodInput">
        <input
          type="submit"
          value="SUBMIT"
          className="sub"
          onClick={submitHandler}
        />
      </div>
      {msg ? <div className="tc alert"> {msg} </div> : ""}
    </div>
  );
};

const setLS = (currValue) => {
  let currData = localStorage.getItem("order_data");
  if (currData) currData = JSON.parse(currData);
  else currData = [];
  let temp = [];
  temp.push(currValue);
  localStorage.setItem("order_data", JSON.stringify([...currData, ...temp]));
};
const makeid = (length) => {
  let result = "";
  let characters = "0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export default AddOrder;
