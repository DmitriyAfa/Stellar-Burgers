import React, { StrictMode } from "react";
import "./index.module.css";
import App from "./components/app/app";
import { BrowserRouter } from "react-router-dom";

//REDUX
import { Provider } from "react-redux";
import { store } from "./services/store";

import { createRoot } from "react-dom/client";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
