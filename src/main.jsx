import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from '@redux-saga/core';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootSaga from './redux/sagas';
import reducers from './redux/reducers';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = compose(
  applyMiddleware(...middleware),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)(reducers);

sagaMiddleware.run(rootSaga);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
