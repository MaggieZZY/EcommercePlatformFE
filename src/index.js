import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/js/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {applyMiddleware, createStore} from "redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import {rootReducer} from "./reducers/root.reducer";
import ReduxPromise from 'redux-promise';
import Login from "./containers/js/Login";
import SignUp from "./containers/js/Signup";
import Products from "./containers/js/Products/Products";
import {Home} from "./components/Home";
import guard from "./components/guard.hoc"
import ProductDetail from "./containers/js/Products/ProductDetail";
import ProductsBySearch from "./containers/js/Products/ProductsBySearch";
import Cart from "./containers/js/Cart";
import Checkout from "./containers/js/Checkout/Checkout";
import ViewProfile from "./containers/js/Profile/ViewProfile";
import ViewOrders from "./containers/js/Orders/ViewOrders";
import TrackOrders from "./containers/js/Orders/TrackOrders";
import ManageOrders from "./containers/js/Orders/ManageOrders";
import EditProfile from "./containers/js/Profile/EditProfile";
import AddProfile from "./containers/js/Profile/AddProfile";
import AddReview from "./containers/js/AddReview";
import ProductsBySales from "./containers/js/Products/ProductsBySales";


const createStoreWithMiddleWare = applyMiddleware(ReduxPromise)(createStore);


ReactDOM.render(

    <Provider store={createStoreWithMiddleWare(rootReducer)}>

        <BrowserRouter>
            <App>
                <Switch>

                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/viewprofile" component={guard(ViewProfile)}/>
                    <Route path="/editprofile" component={guard(EditProfile)}/>
                    <Route path="/addprofile" component={guard(AddProfile)}/>
                    <Route path="/vieworders" component={guard(ViewOrders)}/>
                    <Route path="/trackorders/id/:id" component={guard(TrackOrders)}/>
                    <Route path="/products/category/:categoryId" component={Products} />
                    <Route path="/products/search/:search" component={ProductsBySearch} />
                    <Route path="/products/sales" component={ProductsBySales} />
                    <Route path="/products/id/:id" component={ProductDetail} />
                    <Route path="/addreview/:productId" component={guard(AddReview)}/>
                    <Route path="/cart" component={Cart} />
                    <Route path="/checkout" component={guard(Checkout)} />
                    <Route path="/manageorders" component={guard(ManageOrders)}/>
                    <Route path="/" component={Home} />

                </Switch>
            </App>
        </BrowserRouter>

    </Provider>

    , document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
