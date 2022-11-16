import React, { StrictMode } from "react";

import "./index.module.css";

import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./components/AppRouter/AppRouter";

import { createRoot } from "react-dom/client";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>
);
