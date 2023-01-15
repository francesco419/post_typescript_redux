import { useState } from "react";
import "./UserEdit.scss";

export function UserEdit() {
  const [hide, setHide] = useState<boolean>(true);
  const [exit, setExit] = useState<boolean>(true);

  return (
    <div id="edit" className="wrapper">
      <div className="user-edit">
        {/* user-edit은 이후에 form형태 */}
        <div className="user-primary-block">
          <div className="user-primary">
            <p>Name : </p>
            <input
              id="setting-username"
              className="user-input"
              type="text"
              autoComplete="off"
            />
            <button>중복확인</button>
          </div>
          <div className="user-primary">
            <p>Password : </p>
            <input
              id="setting-password"
              className="user-input"
              type="password"
            />
            <button
              onClick={() => {
                setHide((hide) => !hide);
              }}
            >
              암호확인
            </button>
          </div>
          <div
            style={{ display: hide ? "none" : "flex" }}
            className="user-primary-hidden"
          >
            <input
              id="setting-newpassword"
              className="user-input-none"
              type="password"
            />
          </div>
          <div className="user-primary">
            <p>Birth : </p>
            <input id="setting-birth" className="user-input" type="date" />
          </div>
          <div className="user-primary">
            <p>Email : </p>
            <input
              id="setting-email"
              className="user-input"
              type="email"
              placeholder="SocialNetwork@gmail.com"
            />
          </div>
        </div>
        <div className="user-secondary-block">
          <div className="user-secondary">
            <p>{"<Info>"}</p>
            <input id="setting-intro" className="user-input-info" type="text" />
          </div>
        </div>
        <div className="user-save">
          <button
            className="user-save-btn"
            onClick={() => {
              (
                document.getElementById("edit") as HTMLDivElement
              ).style.display = "none";
            }}
          >
            Submit
          </button>
          <button
            className="user-save-btn"
            onClick={() => {
              setExit((exit) => !exit);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <div style={{ display: exit ? "none" : "flex" }} className="ask-exit">
        <p>Discard Changes and Leave?</p>
        <div className="ask-exit-btn">
          <button
            onClick={() => {
              (
                document.getElementById("edit") as HTMLDivElement
              ).style.display = "none";
              setExit((exit) => !exit);
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setExit((exit) => !exit);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
