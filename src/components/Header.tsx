import "./Header.scss";
import { Link } from "react-router-dom";
import wolf from "../pictures/grey_wolf.png";
import { ReactComponent as Menu } from "../pictures/menu.svg";
import { useState } from "react";

export function Header() {
  const [bool, setBool] = useState<boolean>(false);
  const doc = document.documentElement.style;

  return (
    <header id="header" className="header-container">
      <nav className="block-header-inner">
        <div className="block-header-0">
          <img src={wolf} />
          <h2>Social Network</h2>
        </div>
        <div className="block-header-1">
          <Link className="header-link" to={`/`}>
            Home
          </Link>
          <Link className="header-link" to={`/Login`}>
            Login
          </Link>
          <div className="block-header-2">
            <button
              id="menu"
              className="button-header-svg"
              onClick={() => {
                if (bool) {
                  setBool(false);
                } else {
                  setBool(true);
                }
                if (doc) {
                  console.log(doc.getPropertyValue("--color-bk"));
                }
              }}
            >
              <Menu width="40px" height="40px" />
              <div className={bool ? "block-absolute-none" : "display"}>
                <div>My Profile</div>
                <div>Settings</div>
                <div>Logout</div>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
