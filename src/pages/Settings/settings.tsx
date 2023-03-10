import "./settings.scss";
import { useEffect, useState } from "react";
/*----------component-------------------------- */
import { Header } from "../../components/header/header";
import { ImageUpload } from "./userSettings/imageUpload";
import { UserSetting } from "./userSettings/userSetting";
import { PageSetting } from "./pageSettings/pageSetting";
/*------------redux-------------------------- */
import { reset } from "../../redux/Slices/userSlice";
import { useAppDispatch } from "../../redux/hooks";

export default function Settings() {
  //const user = useAppSelector(selectUser);
  return (
    <div>
      <ImageUpload />
      <div className="page-settings">
        <Header />
        <SettingFunc />
      </div>
    </div>
  );
}

function SettingFunc() {
  const [name, setName] = useState<string>();
  const dispatch = useAppDispatch();

  interface SettingsType {
    title: string;
  }

  function SettingRight(data: SettingsType) {
    function ChooseSet() {
      switch (data.title) {
        case "user Setting":
          return <UserSetting />;
        case "page Setting":
          return <PageSetting />;
        case "3 Setting":
          return null;
        case "4 Setting":
          return null;

        default:
          return null;
      }
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

  function SettingLeft() {
    return (
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
              setName("post Setting");
            }}
          >
            post Setting
          </li>
          <li
            onMouseEnter={() => {
              setName("page Setting");
            }}
          >
            page Setting
          </li>
          <li
            onClick={() => {
              dispatch(reset());
            }}
          >
            <p>Logout</p>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="block-settings-inner">
      <SettingLeft />
      <SettingRight title={name} />
    </div>
  );
}
