import App from "./App";
import "./index.scss";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
//redux
import { Provider } from "react-redux";
import { store } from "./redux/store";
//import { persistStore } from "redux-persist"; // 추가
//import { PersistGate } from "redux-persist/lib/integration/react";

//let persistor = persistStore(store);
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
