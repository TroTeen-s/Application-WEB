
import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import App from '../js/components/App';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Store from "./components/store/Store"
import NotFound from "./components/notFound/NotFound"


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/store" element={<Store />} />
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