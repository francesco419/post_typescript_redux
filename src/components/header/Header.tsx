import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
/*-------------redux------------------------------------- */
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser, reset } from "../../redux/Slices/userSlice";
/*-------------extra------------------------------------- */
import { Follow } from "../extra/Follow";
import { ReactComponent as Icon } from "../../pictures/triangle_logo.svg";
import ToggleSwitch from "../extra/ToggleSwitch";
import { selectFunc } from "../../redux/Slices/funcSlice";

export function Header() {
  const follow = useAppSelector(selectFunc);
  const nav = useNavigate();

  return (
    <header id="header" className="header-container">
      {follow.value.pointer && <Follow />}
      <nav>
        <div
          className="block-header-0"
          onClick={() => {
            nav(`${process.env.PUBLIC_URL}/`);
          }}
        >
          <Icon className="svg-icon" />
          <h2>Triangle</h2>
        </div>
        <Menu />
        <NavSearch />
      </nav>
    </header>
  );
}

function Menu() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    loginCheck();
  }, []);

  const loginCheck = () => {
    if (user.value.password !== "anonymous") {
      setLoggedIn((loggedIn) => true);
    }
  };
  return (
    <div className="block-header-1">
      <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
      <Link to="/profile">My Profile</Link>
      <Link to={`/POST`}>Post</Link>
      <Link to="/settings">Settings</Link>
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
  );
}

function NavSearch() {
  const [searchText, setSearchText] = useState<string>();
  const nav = useNavigate();

  return (
    <div className="header-search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nav(`/Search/${searchText}`);
        }}
      >
        <input
          onChange={(e) => {
            setSearchText((searchText) => e.target.value);
          }}
          type="text"
          autoComplete="off"
          placeholder="search..."
        />
      </form>
    </div>
  );
}
