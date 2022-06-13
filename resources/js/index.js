import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import Store from "./components/store/Store"
import NeedHelp from "./components/needHelp/NeedHelp"
import NotFound from "./components/notFound/NotFound"
// import SignInPage from "./components/auth/SignInPage";
import MainApp from "./components/MainApp";
import { Navigate, Routes } from "react-router";
import AuthPage from "./components/auth/AuthPage";
import SignUpForm from "./components/auth/SignUpForm";
import SignInForm from "./components/auth/SignInForm";
import Account from "./components/account/Account";
import Main from './components/main/Master'

import Trot from './components/dashboard/main';
import Customers from './components/dashboard/Customers';
import InnerContent from './components/dashboard/App'
import Following from './components/dashboard/Following'
import Ticket from './components/dashboard/ticket/indexTicket'
import Api from './components/dashboard/api/api'

import Shop from './components/shop/App'
import Informations from "./components/account/Informations";
import Password from "./components/account/Password";
import Delete from "./components/account/Delete";
import Admin from './components/admin/Admin';
import User from './components/admin/User'
import Sponsors from './components/sponsors/Sponsors';

import ShopAdmin from "./components/dashboard/boutique/shop";
import ProductPage from "./components/shop/ProductPage";
import Subscriptions from "./components/account/Subscriptions";
import SubscriptionDetails from "./components/account/SubscriptionDetails";
import './i18n.js'

ReactDOM.render(

    <React.StrictMode>
        <Router>
            <Routes>

                <Route path="auth" element={<AuthPage />}>
                    <Route index element={<Navigate to="/auth/login" replace />} />
                    <Route path="login" element={<SignInForm />} />
                    <Route path="register" element={<SignUpForm />} />
                </Route>

                <Route exact path="/" element={<MainApp />}>

                    <Route index element={<Navigate to="/main" replace />} />
                    <Route path="main" element={<Main />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="needHelp" element={<NeedHelp />} />
                    <Route path="store" element={<Store />} />
                    <Route path="products/:id" element={<ProductPage />} />
                    <Route path="sponsors" element={<Sponsors />} />


                    <Route path="account" element={<Account />}>
                        <Route index element={<Navigate to="/account/informations" replace />} />
                        <Route path="informations" element={<Informations />} />
                        <Route path="password" element={<Password />} />
                        <Route path="delete" element={<Delete />} />
                        <Route path="subscriptions" element={<Subscriptions />} />
                        <Route path="subscriptions/:subscriptionID" element={<SubscriptionDetails />} />
                    </Route>


                    <Route path="/Dashboard" element={<InnerContent />} >
                        <Route index element={<Navigate to="trot" replace />} />
                        <Route path="trot" element={<Trot />} />
                        <Route path="following" element={<Following />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="shopAdmin" element={<ShopAdmin />} />
                        <Route path="ticket" element={<Ticket />} />
                        <Route path="api" element={<Api/>}/>
                    </Route>

                    <Route path="/admin" element={<Admin />} />
                    <Route path="/user/:id" element={<User />} />

                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>

    </React.StrictMode>,
    document.getElementById('root')
);

