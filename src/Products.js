import React, { useState, useEffect } from "react";
import products from "./Resources/products.json";

export default function Products(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, searchProducts] = useState("");
  const [searchInput, setSearchVal] = useState("");
  const [offset, setOffset] = useState(0);
  const [moreResults, setMoreResults] = useState(true);

  const searchHandler = () => {
    if (searchInput) searchProducts(searchInput);
  };

  const inpChangeHandler = (event) => {
    let searchVal = event.target.value;
    if (searchVal) setSearchVal(searchVal);
    if (searchVal) searchProducts(searchVal);
  };

  const nextHandler = () => {
    let currOffset = offset + 20;
    setOffset(currOffset);
  };
  const getLS = () => {
    let currData = localStorage.getItem("prod_data");
    if (currData) currData = JSON.parse(currData);
    else currData = [];
    return currData;
  };

  useEffect(() => {
    let results = [],
      finalResults = [];
    if (keyword) {
      results = [...getLS(), ...products]
        .filter(
          (el) =>
            el["Item Name"].toLowerCase().indexOf(keyword.toLowerCase()) > -1
        )
        .slice(offset, offset + 20);
      if (results.length < 20) setMoreResults(false);
      if (offset === 0) finalResults = [...results];
      else finalResults = [...searchResults, ...results];
    } else {
      results = [...getLS(), ...products].slice(0, 20);
      finalResults = results;
    }
    setSearchResults(finalResults);
  }, [keyword, offset, moreResults]);

  return (
    <div className={"contentArea " + (searchResults.length ? "" : " ht100")}>
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="Search for Products"
          onChange={inpChangeHandler}
        />
        <button type="submit" className="button" onClick={searchHandler}>
          SUBMIT
        </button>
      </div>
      {searchResults.length ? (
        <>
          <div className="prodDisplay">
            {searchResults.map((u, index) => (
              <div
                key={index}
                onClick={() =>
                  props &&
                  Object.entries(props).length &&
                  props.data(u.images.fixed_height_small.url)
                }
                className="prodCard"
              >
                <div className="">{u["Item Name"]}</div>
                <div className="">
                  {`${u["Selling Price"]} ${u["Unit"] ? "/" : ""} ${u["Unit"]}`}
                </div>
              </div>
            ))}
          </div>
          {keyword && moreResults && (
            <div className="button nextBtn" onClick={nextHandler}>
              NEXT
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
