import { StrictMode } from "react";

import "./styles/index.scss";

import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./components/AppRouter/AppRouter";

import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>
);
