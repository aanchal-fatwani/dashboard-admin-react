import React, { useState } from "react";
import Products from "./Products";
import AddProduct from "./AddProduct";
import CustomerList from "./CustomerList";
import OrderDisplay from "./OrderDisplay";
import AddOrder from "./AddOrder";

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState("Customers");
  const [cId, setCId] = useState("");
  const [cNm, setCNm] = useState("");
  const [cEm, setCEm] = useState("");
  const setTab = (val) => {
    setCurrentTab(val);
  };
  const setCustId = (cId) => {
    setCId(cId);
  };
  const setCustName = (cNm) => {
    setCNm(cNm);
  };
  const setCustEmail = (cEm) => {
    setCEm(cEm);
  };

  return (
    <div className="dash">
      <div className="top">
        <div
          className={`tabs ${currentTab === "Search Product" ? "active" : ""}`}
          onClick={() => setTab("Search Product")}
        >
          Search Product
        </div>
        <div
          className={`tabs ${currentTab === "Add Product" ? "active" : ""}`}
          onClick={() => setTab("Add Product")}
        >
          Add Product
        </div>
        <div
          className={`tabs ${currentTab === "Customers" ? "active" : ""}`}
          onClick={() => setTab("Customers")}
        >
          Customers
        </div>
        <div
          className={`tabs ${currentTab === "Add Order" ? "active" : ""}`}
          onClick={() => setTab("Add Order")}
        >
          Add Order
        </div>
        <div
          className={`tabs ${currentTab === "Order History" ? "active" : ""}`}
          onClick={() => setTab("Order History")}
        >
          Order History
        </div>
      </div>
      <div className="bottom">
        {currentTab === "Search Product" && <Products />}
        {currentTab === "Add Product" && <AddProduct />}
        {currentTab === "Customers" && (
          <CustomerList
            setTab={setTab}
            setCustId={setCustId}
            setCustName={setCustName}
            setCustEmail={setCustEmail}
          />
        )}
        {currentTab === "Add Order" && (
          <AddOrder cId={cId} cNm={cNm} cEm={cEm} />
        )}
        {currentTab === "Order History" && <OrderDisplay />}
      </div>
    </div>
  );
};

export default Dashboard;
