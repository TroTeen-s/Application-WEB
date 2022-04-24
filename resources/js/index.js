import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Store from "./components/store/Store"
import NeedHelp from "./components/needHelp/NeedHelp"
import NotFound from "./components/notFound/NotFound"
import LoginPage from "./components/auth/LoginPage";
// import SignInPage from "./components/auth/SignInPage";
import MainApp from "./components/MainApp";
import { Navigate } from "react-router";
import AuthPage from "./components/auth/AuthPage";
import SignUpForm from "./components/auth/SignUpForm";
import SignInForm from "./components/auth/SignInForm";
import Account from "./components/account/Account";
import GestionApp from './components/gestion/Gestion'
import Admin from './components/admin/Admin'
import Users from './components/admin/Users'
import Scooters from './components/admin/Scooters'


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route exact path="/" element={<MainApp />}>
                    <Route path="auth" element={<AuthPage />}>
                        <Route index element={<Navigate to="/auth/login" replace />} />
                        <Route path="login" element={<SignInForm />} />
                        <Route path="register" element={<SignUpForm />} />
                    </Route>
                    <Route path="need_help" element={<NeedHelp />} />
                    <Route path="store" element={<Store />} />
                    <Route path="account" element={<Account />} />
                    <Route path="/logina" element={<LoginPage />} />
                    <Route path="/gestion" element={<GestionApp />} />

                    <Route path="/admin" element={<Admin />}>
                        <Route index element={<Navigate to="/admin/users" replace />} />
                        <Route path="users" element={<Users />} />
                        <Route path="trotinette" element={<Scooters />} />
                    </Route>
                </Route>
                {/* <Route path="/loginas" element={<SignInPage/>}/> */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>


    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//
