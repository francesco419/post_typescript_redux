import "./Header.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Menu } from "../pictures/menu.svg";
import { ReactComponent as Icon } from "../pictures/wolf.svg";
import { useEffect, useState } from "react";
import { Follow } from "./Follow";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLikes, selectLikes } from "../redux/Slices/likesSlice";
import { reset } from "../redux/Slices/userSlice";

export function Header() {
  const [bool, setBool] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    loginCheck();
  }, []);

  function loginCheck() {
    const isLog = JSON.parse(sessionStorage.getItem("persist:root"));
    if (!isLog) {
      return;
    }
    const user = JSON.parse(isLog.user);
    const password: string = user.value.password;
    if (password !== "anonymous") {
      console.log("logged");
      setLoggedIn((loggedIn) => true);
    } else {
      console.log("not logged");
    }
  }

  return (
    <header id="header" className="header-container">
      <Follow />
      <nav className="block-header-inner">
        <div className="block-header-0">
          <Icon className="svg-icon" />
          <h2>Social Network</h2>
        </div>
        <div className="block-header-1">
          <Link className="header-link" to={`/`}>
            Home
          </Link>
          {loggedIn ? (
            <button
              className="btn-header-link"
              onClick={() => {
                dispatch(reset());
                setLoggedIn((loggedIn) => false);
              }}
            >
              Logout
            </button>
          ) : (
            <Link className="header-link" to={`/Login`}>
              Login
            </Link>
          )}

          <div className="block-header-2">
            <button
              type="button"
              id="menu"
              className="button-header-svg"
              onClick={() => {
                if (bool) {
                  setBool(false);
                } else {
                  setBool(true);
                }
              }}
            >
              <Menu className="svg-menu" width="40px" height="40px" />
              <div className={bool ? "block-absolute-none" : "display"}>
                <Link className="link-header-dropdown" to="/profile">
                  My Profile
                </Link>
                <Link className="link-header-dropdown" to="/settings">
                  Settings
                </Link>
                <div>Logout</div>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
