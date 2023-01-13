import "./Header.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Menu } from "../pictures/menu.svg";
import { ReactComponent as Icon } from "../pictures/wolf.svg";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";

export function Header() {
  const [bool, setBool] = useState<boolean>(false);

  return (
    <header id="header" className="header-container">
      <nav className="block-header-inner">
        <div className="block-header-0">
          <Icon className="svg-icon" />
          <h2>Social Network</h2>
        </div>
        <div className="block-header-1">
          <ModeToggle />
          <Link className="header-link" to={`/`}>
            Home
          </Link>
          <Link className="header-link" to={`/Login`}>
            Login
          </Link>
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
