
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <> <Header /> <Login /> </> } />
        <Route path="/register" element={ <> <Header /> <Register /> </> } />
        <Route path="/reset-password" element={ <> <Header /> <ResetPassword /> </> } />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;
