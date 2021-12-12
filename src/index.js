import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

const TRACKING_ID = "UA-6682095-1";
ReactGA.initialize(TRACKING_ID);
