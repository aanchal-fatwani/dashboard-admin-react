import React, { useState } from "react";
import customersList from "./Resources/customer.json";
import CustomerOrders from "./CustomerOrders";

const CustomerList = (props) => {
  const [customers, setCustomers] = useState([...customersList.slice(0, 10)]);
  const [offset, setOffset] = useState(0);
  const [moreResults, setMoreResults] = useState(true);
  const [custDetail, setCustDetail] = useState(false);
  const [custInFocus, setCustInFocus] = useState("");

  const nextHandler = () => {
    let currOffset = offset + 10;
    setOffset(currOffset);
    setCustomers([
      ...customers,
      ...customersList.slice(currOffset, currOffset + 10),
    ]);
    if (customersList.slice(currOffset, currOffset + 10).length < 10)
      setMoreResults(false);
    setCustDetail(false);
    setCustInFocus("");
  };

  const custDataHandler = (cId) => {
    setCustDetail(true);
    setCustInFocus(cId);
  };
  return (
    <div className="df fdr">
      <div className="df fdc jcc">
        <div className="df fdr flw spa">
          {customers.map((c) => (
            <div
              className="custCard"
              onClick={() => custDataHandler(c["Customer ID"])}
            >
              <div>{c["Customer Name"]}</div>
              <div> {c["EmailID"]}</div>
            </div>
          ))}
        </div>
        {moreResults && (
          <div className="button w100 nextBtn" onClick={nextHandler}>
            NEXT
          </div>
        )}
      </div>
      <div>
        <div className="past df fdc spa">
          Past Orders <br />
          (Select a customer to see past records)
        </div>
        {customers.map((c) => (
          <>
            {custDetail && custInFocus === c["Customer ID"] && (
              <>
                <CustomerOrders cId={c["Customer ID"]} />
                <div
                  className="past  brd5"
                  onClick={() => {
                    props.setTab("Add Order");
                    props.setCustId(c["Customer ID"]);
                    props.setCustName(c["Customer Name"]);
                    props.setCustEmail(c["EmailID"]);
                  }}
                >
                  Add Order
                </div>
              </>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
