import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./components/app/app";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />,
  </StrictMode>,
  rootElement
);
