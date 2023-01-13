import React from "react";
import { Counter } from "./redux/counter/Counter";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    console.log("theme-mount : light");
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/profile`} element={<Profile />} />
        <Route path={`/Login`} element={<Login />} />
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
