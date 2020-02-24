import React, { useState } from "react";
import "./App.css";
import DataFetching from "./components/usStockQuotes/DataFetching";
import CryproFxQuotes from "./components/fxQuotes/CryptoFxQuotes";
import Indices from "./components/indices/Indices";

function App() {
  const [symbol, setSymbol] = useState("DJI");
  return (
    <div className="container">
      <div className="app-wrapper">
        <Indices symbol="DJI" />
        <Indices symbol="INX" />
      </div>
      <div className="app-wrapper">
        <DataFetching />
      </div>

      <div className="app-wrapper">
        <CryproFxQuotes symbol="BTC-USD" />
        <CryproFxQuotes symbol="BTC-GBP" />
        <CryproFxQuotes symbol="ETH-USD" />
        <CryproFxQuotes symbol="LTC-USD" />
      </div>
    </div>
  );
}

export default App;
