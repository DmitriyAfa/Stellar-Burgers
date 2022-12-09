import { StrictMode } from "react";

import "./styles/index.scss";

import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./components/AppRouter/AppRouter";

import { store } from "./services/redux/store";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux/es/exports";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
