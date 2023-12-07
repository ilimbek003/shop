import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import profile from "./reducers/profile";
import products from "./reducers/products";
import main from "./reducers/main";
import order from "./reducers/order";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({ auth, profile, products, main, order });

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
