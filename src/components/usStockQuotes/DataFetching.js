import React, { useState } from "react";
import "./DataFetching.css";
import axios from "axios";

const DataFetching = () => {
  const [symbol, setSymbol] = useState("");
  const [open, setOpen] = useState("");
  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");
  const [price, setPrice] = useState("");
  const [volume, setVolume] = useState("");
  const [previousClose, setPreviousClose] = useState("");
  const [change, setChange] = useState("");
  const [changePercentage, setChangePercentage] = useState("");
  const [noStockFound, setNoStockFound] = useState("");

  // RSS FEEDS
  const [items, setItems] = useState([]);

  const [inputStock, setInputStock] = useState("");

  const fetchData = e => {
    if (e.key === "Enter") {
      const apiKey = "8IA62KIO9B9SDYNS";
      e.preventDefault();

      axios
        .get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${inputStock}&apikey=${apiKey}`
        )
        .then(res => {
          if (res.data["Global Quote"] === undefined) {
            setNoStockFound("no stock found");
          }
          console.log(res.data["Global Quote"]);
          setSymbol(res.data["Global Quote"]["01. symbol"]);
          setOpen(res.data["Global Quote"]["02. open"]);
          setHigh(res.data["Global Quote"]["03. high"]);
          setLow(res.data["Global Quote"]["04. low"]);
          setPrice(res.data["Global Quote"]["05. price"]);
          setVolume(res.data["Global Quote"]["06. volume"]);
          setPreviousClose(res.data["Global Quote"]["08. previous close"]);
          setChange(res.data["Global Quote"]["09. change"]);
          setChangePercentage(res.data["Global Quote"]["10. change percent"]);
        })
        .catch(err => {
          console.log(err);
        });

      axios
        .get(
          `https://api.rss2json.com/v1/api.json?rss_url=http://finance.yahoo.com/rss/headline?s=${inputStock}`
        )
        .then(res => {
          console.table(res.data.items);
          setItems(res.data.items);
        })
        .catch(err => {
          console.log(err);
        });

      clearInput();
    }
  };

  const changeHandler = e => {
    setInputStock(e.target.value.toUpperCase());
  };

  const clearInput = () => {
    setInputStock("");
    setNoStockFound("");
  };

  return (
    <React.Fragment>
      {noStockFound ? (
        <div>
          "No Such Stock Found"
          <div className="input-wrapper">
            <input
              type="text"
              onChange={changeHandler}
              value={inputStock}
              onKeyPress={fetchData}
            />
            <button onClick={fetchData}>Fetch</button>
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className="input-wrapper">
            <input
              type="text"
              onChange={changeHandler}
              value={inputStock}
              onKeyPress={fetchData}
              placeholder="ie: MSFT"
            />
            <button onClick={fetchData}>Fetch</button>
          </div>

          <div className="content-wrapper">
            <div className="price-wrapper">
              <div>
                <div>{symbol}</div>
              </div>

              <div>
                <h3>{price}</h3>
              </div>
            </div>

            <div className="volume-wrapper">
              <div className="small-text">Volume</div> <div>{volume}</div>
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

            <div className="history-wrapper border-temp">
              <div className="history-inner-wrapper">
                <div className="small-text">Previous Close</div>
                <div>{previousClose}</div>
                <div className="small-text">Open</div>
                <div>{open}</div>
              </div>
              <div className="history-inner-wrapper">
                <div className="small-text">High</div>
                <div>{high}</div>
                <div className="small-text">Low</div>
                <div>{low}</div>
              </div>
            </div>
            <div className="headline-wrapper">
              <h5>{symbol} Headlines</h5>
              {items.map(item => {
                return (
                  <React.Fragment>
                    <ul key={item.guid}>
                      <li> {item.title}</li>
                    </ul>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DataFetching;
