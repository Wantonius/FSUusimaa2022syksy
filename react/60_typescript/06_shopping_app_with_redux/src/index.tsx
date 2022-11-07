import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware,combineReducers,Store,AnyAction} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {AppState} from './types/states';
import {BrowserRouter} from 'react-router-dom';
import loginReducer from './reducers/loginReducer';
import shoppingReducer from './reducers/shoppingReducer';

const rootReducer = combineReducers<AppState>({
	shopping:shoppingReducer,
	login:loginReducer
})

const store:Store<AppState,AnyAction> = createStore(rootReducer,applyMiddleware(thunk));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
