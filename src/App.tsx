import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useAppSelector } from "./redux/hooks";
import { selectDark } from "./redux/Slices/darkSlice";
import { Follow } from "./components/Follow";

function App() {
  const darkmode = useAppSelector(selectDark);
  useEffect(() => {
    const theme: string = sessionStorage.getItem("theme");
    if (theme) {
      if (theme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/settings`} element={<Settings />} />
        <Route path={`/profile`} element={<Profile />} />
        <Route path={`/Login`} element={<Login />} />
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
