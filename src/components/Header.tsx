import "./Header.scss";
import { Link } from "react-router-dom";
import wolf from "../pictures/grey_wolf.png";
import { ReactComponent as Menu } from "../pictures/menu.svg";
import { useState } from "react";

export function Header() {
  /*  const btn = (e: React.ChangeEvent<HTMLInputElement>, data: boolean) => {
    let btns = document.getElementById("menu");
    console.log(data);
    if (btns.classList.contains("active")) {
      btns.classList.add("deactive");
      btns.classList.remove("active");
    } else {
      btns.classList.add("active");
      btns.classList.remove("dective");
    }
  }; */
  const [bool, setBool] = useState<boolean>(false);

  return (
    <div className="header-container">
      <div className="block-header-inner">
        <div className="block-header-0">
          <img src={wolf} />
          <h3>Social Network</h3>
        </div>
        <div className="block-header-1">
          <Link className="header-link" to={`/`}>
            Home
          </Link>
          <Link className="header-link" to={`/Login`}>
            Login
          </Link>
          <button
            id="menu"
            className="block-header-svg"
            onClick={() => {
              if (bool) {
                setBool(false);
              } else {
                setBool(true);
              }
            }}
          >
            <Menu width="40px" height="40px" />
          </button>
        </div>
        <div className={bool ? "block-absolute-none" : "display"}>
          <div>A</div>
          <div>B</div>
          <div>C</div>
          <div>D</div>
          <div>E</div>
          <div>F</div>
        </div>
      </div>
    </div>
  );
}
