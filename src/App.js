
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
import Books from "./components/Books";
import BooksHeader from "./components/BooksHeader";
import Fiction from "./components/Fiction";
import NonFiction from "./components/NonFiction";
import Romance from "./components/Romance";
import YoungAdult from "./components/YoungAdult";
import Fantasy from "./components/Fantasy";
import Humor from "./components/Humor";

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
        <Route path="/books" element={<Layout headerContent={<BooksHeader/>}><Books/></Layout>}/>
        <Route path="/fiction" element={<Layout headerContent={<BooksHeader/>}><Fiction/></Layout>}/>
        <Route path="/non-fiction" element={<Layout headerContent={<BooksHeader/>}><NonFiction/></Layout>}/>
        <Route path="/romance" element={<Layout headerContent={<BooksHeader/>}><Romance/></Layout>}/>
        <Route path="/young-adult" element={<Layout headerContent={<BooksHeader/>}><YoungAdult/></Layout>}/>
        <Route path="/fantasy" element={<Layout headerContent={<BooksHeader/>}><Fantasy/></Layout>}/>
        <Route path="/humor" element={<Layout headerContent={<BooksHeader/>}><Humor/></Layout>}/>
      </Routes>
    </Router>
  );
};


export default App;
