import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import About from "./components/About";
import Account from "./components/Account";
import LandingPage from "./components/LandingPage";
import ResetPassword from "./components/ResetPassword";
import Books from "./components/Books";
import BooksList from "./components/BooksList"; // Import BooksList
import Publish from "./components/Publish";
import useAuthStore from "./authStore";

const App = () => {
  const { isLoggedIn, username, setLoggedIn, setUsername } = useAuthStore();

  return (
    <Router>
      <Layout
        headerContent={
          <Header
            isLoggedIn={isLoggedIn}
            username={username}
            setLoggedIn={setLoggedIn}
          />
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />}
          />
          <Route
            path="/account"
            element={<Account setLoggedIn={setLoggedIn} />} // Pass setLoggedIn here
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/books" element={<Books />} />
          <Route path="/about" element={<About />} />
          <Route path="/books-list/:category" element={<BooksList />} />
          <Route path="/books-list" element={<BooksList />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
