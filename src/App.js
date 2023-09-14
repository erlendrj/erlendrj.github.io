import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import HomePage from "./Pages/Homepage/Homepage";
import NavBar from "./Components/Navbar/Navbar";
import Statistics from "./Pages/Statistical/Statistics";
import Login from "./Pages/Login/Login";
import Admin from "./Pages/Admin/Admin";
import PrivateRoutes from "./Components/PrivateRoute/PrivateRoutes";
import Tournament from "./Pages/Tournaments/Tournament";
import StatisticsHome from "./Pages/Statistical/StatisticsHome";

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/statistics/:id" element={<Statistics />} />
          <Route path="/statistics" element={<StatisticsHome />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/tournaments" element={<Tournament />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
