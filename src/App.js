import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App; 