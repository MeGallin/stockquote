import React, { useEffect, useState } from "react";
import "./CryptoFxQuotes.css";
import axios from "axios";
var moment = require("moment");

const CryptoFxQuotes = props => {
  const symbol = props.symbol;

  const [tradeId, setTradeId] = useState("");
  const [ask, setAsk] = useState("");
  const [bid, setBid] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [time, setTime] = useState("");
  const [volume, setVolume] = useState("");

  useEffect(() => {
    setInterval(() => {
      axios
        .get(`https://api.gdax.com/products/${symbol}/ticker`)
        .then(res => {
          console.log(res.data);
          setTradeId(res.data.trade_id);
          setAsk(res.data.ask);
          setBid(res.data.bid);
          setPrice(res.data.price);
          setSize(res.data.size);
          setTime(res.data.time);
          setVolume(res.data.volume);
        })
        .catch(err => {
          console.log(err);
        });
    }, 1200);
  }, [price]);

  return (
    <React.Fragment>
      <div className="crypto-wrapper">
        <div className="trade-wrapper">
          <div className="inner-wrapper">
            <div className="small-text">Trade ID</div>
            <div>{tradeId}</div>
          </div>

          <div className="price-wrapper">
            <div className={`ask-wrapper ${ask > price ? "up" : "down"}`}>
              <div className="small-text">Ask</div>
              <div>{ask}</div>
            </div>

            <div className="inner-price-wrapper">
              <div>
                <div>{symbol}</div>
              </div>

              <div>
                <h3>{price}</h3>
              </div>
            </div>

            <div className={`bid-wrapper ${ask < price ? "up" : "down"}`}>
              <div className="small-text">Bid</div>
              <div>{bid}</div>
            </div>
          </div>

          <div className="size-wrapper">
            <div className="small-text">Size</div>
            <div>{size}</div>
          </div>

          <div className="volume-wrapper">
            <div className="small-text">Volume: </div> <div>{volume}</div>
          </div>
          <div className="time-wrapper">
            <div className="small-text">
              {moment(time).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CryptoFxQuotes;
