import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/*-------------redux------------------------------------- */
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { reset } from "../../redux/Slices/userSlice";
import { selectUser } from "../../redux/Slices/userSlice";
/*-------------extra------------------------------------- */
import { Follow } from "../extra/Follow";
import { ReactComponent as Menu } from "../../pictures/menu.svg";
import { ReactComponent as Icon } from "../../pictures/wolf.svg";
import ToggleSwitch from "../extra/ToggleSwitch";
import { selectFunc } from "../../redux/Slices/funcSlice";

export function Header() {
  const [bool, setBool] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const follow = useAppSelector(selectFunc);

  useEffect(() => {
    loginCheck();
  }, []);

  function loginCheck() {
    if (user.value.password !== "anonymous") {
      setLoggedIn((loggedIn) => true);
    }
  }

  function Menu() {
    return (
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
    );
  }

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
          <h2>Social Network</h2>
        </div>
        <Menu />
        <NavSearch />
      </nav>
    </header>
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
