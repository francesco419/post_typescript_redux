import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
/*-------------pages------------------------------------- */
import Main from "./pages/Main";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Post from "./pages/Post";
/*-------------redux------------------------------------- */
/*-------------extra------------------------------------- */

function App() {
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
        <Route path={`/Post`} element={<Post />} />
        <Route path={`/settings`} element={<Settings />} />
        <Route path={`/profile`} element={<Profile />} />
        <Route path={`/Login`} element={<Login />} />
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
