import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import createSagaMiddleware from "@redux-saga/core";
import { Provider } from "react-redux";
import rootSaga from "./redux/sagas";
import reducers from "./redux/reducers";
import { configureStore } from "@reduxjs/toolkit";






const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const dev =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = configureStore({
  reducer: reducers,
  middleware: middleware,
  dev,
});

sagaMiddleware.run(rootSaga);

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  
);
