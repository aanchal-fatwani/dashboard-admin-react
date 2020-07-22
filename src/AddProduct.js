import React, { useState } from "react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    "Item ID": "15782" + Date.now(),
    "Item Name": "",
    "Selling Price": "",
    "Sales Account": "Sales",
    Status: "Active",
    Unit: "",
  });
  const [msg, setMsg] = useState("");
  const [contentEditted, setContentEditted] = useState(false);
  const submitHandler = (event) => {
    if (contentEditted) {
      setLS(productData);
      setProductData({
        "Item ID": "15782" + Date.now(),
        "Item Name": "",
        "Selling Price": "",
        "Sales Account": "Sales",
        Status: "Active",
        Unit: "",
      });
      setMsg("Product added succesfully..");
      setTimeout(() => setMsg(false), 2000);
    } else {
      setMsg("Add Product Details First..");
      setTimeout(() => setMsg(""), 2000);
    }
  };
  const inputHandler = (event) => {
    let prodData = { ...productData, [event.target.name]: event.target.value };
    setProductData(prodData);
    setContentEditted(true);
  };
  return (
    <div className="df fdc">
      <div className="prodInput">
        <input
          type="text"
          placeholder="Enter Item Name e.g Amul Full cream milk"
          name="Item Name"
          value={productData["Item Name"]}
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter Selling Price e.g INR 28.00"
          name="Selling Price"
          value={productData["Selling Price"]}
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter Unit e.g pcs"
          name="Unit"
          value={productData["Unit"]}
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
  let currData = localStorage.getItem("prod_data");
  if (currData) currData = JSON.parse(currData);
  else currData = [];
  let temp = [];
  temp.push(currValue);
  localStorage.setItem("prod_data", JSON.stringify([...currData, ...temp]));
};

export default AddProduct;
