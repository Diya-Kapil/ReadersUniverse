// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Favourite from "./pages/Favourites";
import Matches from "./pages/Matches";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Feed from "./pages/Feed";
import CurrentReading from "./pages/CurrentReading";
import AddBook from "./pages/AddBook";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favourites" element={<Favourite />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/current-reading" element={<CurrentReading />} />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
