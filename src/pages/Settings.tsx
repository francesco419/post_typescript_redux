import "./Settings.scss";
import { useEffect, useState } from "react";
/*-------------------------------------- */
import { ModeToggle } from "../components/ModeToggle";
import { Header } from "../components/Header";
import { ImageUpload } from "../components/ImageUpload";
/*-------------------------------------- */
import { ReactComponent as Icon } from "../pictures/wolf.svg";
import { ReactComponent as Edit } from "../pictures/edit.svg";
/*-------------------------------------- */
import { useAppSelector } from "../redux/hooks";
import { selectDark } from "../redux/dark/darkSlice";
import { selectUser } from "../redux/user/userSlice";

export default function Settings() {
  const darkmode = useAppSelector(selectDark);
  const user = useAppSelector(selectUser);
  const [name, setName] = useState<string>();

  interface SettingsType {
    title: string;
  }

  function dkdk() {
    return (
      <div>
        {`dark : ${darkmode}`}
        <ModeToggle />
      </div>
    );
  }

  function UserEdit() {
    const [hide, setHide] = useState<boolean>(true);
    const [exit, setExit] = useState<boolean>(true);
    return (
      <div id="edit" className="wrapper1">
        <div className="user-edit">
          {/* user-edit은 이후에 form형태 */}
          <div className="user-primary-block">
            <div className="user-primary">
              <p>Name : </p>
              <input className="user-input" type="text" />
              <button>중복확인</button>
            </div>
            <div className="user-primary">
              <p>Password : </p>
              <input className="user-input" type="password" />
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
              <input className="user-input-none" type="password" />
            </div>
            <div className="user-primary">
              <p>Birth : </p>
              <input className="user-input" type="date" />
            </div>
            <div className="user-primary">
              <p>Email : </p>
              <input
                className="user-input"
                type="email"
                placeholder={user.email}
              />
            </div>
          </div>
          <div className="user-secondary-block">
            <div className="user-secondary">
              <p>{"<Info>"}</p>
              <input className="user-input-info" type="text" />
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

  function SettingRight(data: SettingsType) {
    const temp: string[] = [
      `Nickname : ${user.name}`,
      "Password",
      `Birth : ${user.birth}`,
      `Email : ${user.email}`,
    ];

    //console.log(data.title);

    function ChooseSet() {
      switch (data.title) {
        case "user Setting":
          return <UserSet />;
        case "page Setting":
          return null;
        case "3 Setting":
          return null;
        case "4 Setting":
          return null;

        default:
          return null;
      }
    }

    function UserSet() {
      return (
        <div className="block-settings-display">
          <div className="block-settings-0">
            <img src={user.img} />
            <button
              type="button"
              onClick={() => {
                const upload = document.getElementById(
                  "upload"
                ) as HTMLDivElement;
                upload.style.display = "block";
              }}
            >
              Image
            </button>
          </div>
          <div className="block-settings-1">
            {temp.map((data) => (
              <p>
                {data}
                <Edit
                  onClick={() => {
                    (
                      document.getElementById("edit") as HTMLDivElement
                    ).style.display = "block";
                  }}
                />
              </p>
            ))}
          </div>
          <div className="block-settings-2">
            <div>
              <p>Posts</p>
              <p>36</p>
            </div>
            <div>
              <p>Follow</p>
              <p>121</p>
            </div>
            <div>
              <p>Follower</p>
              <p>87</p>
            </div>
          </div>
          <div className="block-settings-3">
            <div className="block-settings-intro">
              <p>
                Intro <Edit />
              </p>
              <div>
                <p>
                  저는 애초에 말을 조리있게 하는 편도 아니고 목소리 톤이 좋은
                  편도 아니라서 남들보다 돋보일 수 없을 거라고
                  생각했었어요.그래서 제가 승부할 수 있는 것은 완벽한 준비와
                  실수를 하지않는 것이라고 생각했죠.그래서 면접을 준비하면서
                  고민이 참 많았던 것 같아요.
                </p>
              </div>
            </div>
          </div>
          <div className="block-settings-4">
            <button>Save</button>
          </div>
        </div>
      );
    }

    return (
      <div className="block-settings-right">
        <div className="block-settings-setting">
          <h2>{data.title}</h2>
          <ChooseSet />
        </div>
      </div>
    );
  }

  return (
    <div>
      <ImageUpload />
      <UserEdit />
      <div className="page-settings">
        <Header />
        <div className="block-settings-inner">
          <div className="block-settings-left">
            <h2>Settings</h2>
            <ul>
              <li
                onMouseEnter={() => {
                  setName("user Setting");
                }}
              >
                user Setting
              </li>
              <li
                onMouseEnter={() => {
                  setName("page Setting");
                }}
              >
                page Setting
              </li>
              <li
                onMouseEnter={() => {
                  setName("3 Setting");
                }}
              >
                3 Setting
              </li>
              <li
                onMouseEnter={() => {
                  setName("4 Setting");
                }}
              >
                4 Setting
              </li>
              <li
                onMouseEnter={() => {
                  setName("Logout");
                }}
              >
                <p>Logout</p>
              </li>
            </ul>
          </div>
          <SettingRight title={name} />
        </div>
      </div>
    </div>
  );
}
