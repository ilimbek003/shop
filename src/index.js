import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import Preloader from "./components/Preloader";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./i18";
import store from "./redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<Preloader />}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </Suspense>
);
