import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
/*-------------pages------------------------------------- */
import Main from "./pages/main/main";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Settings from "./pages/Settings/settings";
import Post from "./pages/post/post";
import Search from "./pages/search";
/*-------------redux------------------------------------- */
/*-------------extra------------------------------------- */
const LazyMain = React.lazy(() => import("./pages/main/main"));

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
    return () => {
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
    };
  }, []);

  return (
    <BrowserRouter>
      <React.Suspense>
        <Routes>
          <Route path={`/Search/:id`} element={<Search />} />
          <Route path={`/Post`} element={<Post />} />
          <Route path={`/settings`} element={<Settings />} />
          <Route path={`/profile`} element={<Profile />} />
          <Route path={`/Login`} element={<Login />} />
          <Route path={`${process.env.PUBLIC_URL}/`} element={<LazyMain />} />
          {/* <Route path={`${process.env.PUBLIC_URL}/`} element={<Main />} /> */}
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
