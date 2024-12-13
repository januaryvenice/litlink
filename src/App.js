
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import AboutUsHeader from "./components/AboutUsHeader";
import Account from "./components/Account";
import AccountHeader from "./components/AccountHeader";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout headerContent={<Header/>}><LandingPage/></Layout>}/>
        <Route path="/login" element={<Layout headerContent={<Header/>}><Login/></Layout>}/>
        <Route path="/register" element={<Layout headerContent={<Header/>}><Register/></Layout>}/>
        <Route path="/reset-password" element={<Layout headerContent={<Header/>}><ResetPassword/></Layout>}/>
        <Route path="/about" element={<Layout headerContent={<AboutUsHeader/>}><About/></Layout>}/>
        <Route path="/account" element={<Layout headerContent={<AccountHeader/>}><Account/></Layout>}/>
      </Routes>
    </Router>
  );
};


export default App;
