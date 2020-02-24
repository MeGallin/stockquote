import React, { useState, useEffect } from "react";
import "./Indices.css";
import axios from "axios";

const Indices = props => {
  console.log(props.symbol);
  const symbol = props.symbol;
  // const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [change, setChange] = useState("");
  const [changePercentage, setChangePercentage] = useState("");

  useEffect(() => {
    const apiKey = "8IA62KIO9B9SDYNS";
    setInterval(() => {
      axios
        .get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
        )
        .then(res => {
          console.log(res.data["Global Quote"]);
          setPrice(res.data["Global Quote"]["05. price"]);
          setChange(res.data["Global Quote"]["09. change"]);
          setChangePercentage(res.data["Global Quote"]["10. change percent"]);
        })
        .catch(err => {
          console.log(err);
        });
    }, 60000);
  }, [symbol]);

  return (
    <React.Fragment>
      <div symbol={symbol}>
        <div className="indices-wrapper">
          <div className="indices-content-wrapper">
            <div>{symbol}</div>
            <div>{parseInt(price)}</div>
          </div>

          <div className="change-wrapper">
            <div className="small-text">
              {Math.sign(change) > 0 ? "up" : "down"}
            </div>
            <div
              className={`change-inner-wrapper ${
                Math.sign(change) > 0 ? "up" : "down"
              }`}
            >
              <div>{change}</div> <div>{changePercentage}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Indices;
