import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import App from '../js/components/App';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Store from "./components/store/Store"
import NeedHelp from "./components/needHelp/NeedHelp"
import NotFound from "./components/notFound/NotFound"
import LoginPage from "./components/auth/LoginPage";
//import SignInPage from "./components/auth/SignInPage";
import MainApp from "./components/MainApp";
import { Navigate } from "react-router";
import AuthPage from "./components/auth/AuthPage";
import SignUpForm from "./components/auth/SignUpForm";
import SignInForm from "./components/auth/SignInForm";
import Account from "./components/account/Account";
import Informations from "./components/account/Informations";
import Password from "./components/account/Password";
import Delete from "./components/account/Delete";
import Admin from './components/admin/Admin';

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
                    <Route path="account" element={<Account />} >
                        <Route index element={<Navigate to="/account/informations" replace />} />
                        <Route path="informations" element={<Informations />} />
                        <Route path="password" element={<Password />} />
                        <Route path="delete" element={<Delete />} />
                    </Route>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/logina" element={<LoginPage />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>


    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//<Route path="/loginas" element={<SignInPage/>}/>
