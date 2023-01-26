import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
/*-------------redux------------------------------------- */
import { useAppDispatch } from "../redux/hooks";
import { reset } from "../redux/Slices/userSlice";
/*-------------extra------------------------------------- */
import { Follow } from "./Follow";
import { ReactComponent as Menu } from "../pictures/menu.svg";
import { ReactComponent as Icon } from "../pictures/wolf.svg";
import ToggleSwitch from "./extra/ToggleSwitch";

export function Header() {
  const [bool, setBool] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

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
      setLoggedIn((loggedIn) => true);
    }
  }

  return (
    <header id="header" className="header-container">
      <nav className="block-header-inner">
        <div
          className="block-header-0"
          onClick={() => {
            nav(`${process.env.PUBLIC_URL}/`);
          }}
        >
          <Icon className="svg-icon" />
          <h2>Social Network</h2>
        </div>
        <div className="block-header-1">
          <Link className="header-link" to={`${process.env.PUBLIC_URL}/`}>
            Home
          </Link>
          <Link className="header-link" to={`/POST`}>
            Post
          </Link>
          <Link className="header-link" to="/profile">
            My Profile
          </Link>
          <Link className="header-link" to="/settings">
            Settings
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
        </div>
        <span className="block-header-2"></span>
      </nav>
    </header>
  );
}
