import { ModeToggle } from "../components/ModeToggle";
import { Header } from "../components/Header";
import { useAppSelector } from "../redux/hooks";
import { selectDark } from "../redux/dark/darkSlice";
import "./Settings.scss";
import { useEffect, useState } from "react";

export default function Settings() {
  const darkmode = useAppSelector(selectDark);
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
  function SettingRight(data: SettingsType) {
    return (
      <div className="block-settings-right">
        <div className="block-settings-setting">
          <h2>{data.title}</h2>
        </div>
      </div>
    );
  }
  const mousemove = (e: MouseEvent) => {
    console.log(
      e.pageX +
        " : page.x, " +
        e.pageY +
        " : page.y, " +
        e.clientX +
        " : clientX, " +
        e.clientY +
        " : clientY "
    );
  };
  useEffect(() => {
    //const a = document.documentElement as HTMLElement;
    window.addEventListener("mousemove", (e) => mousemove(e));
  }, []);

  return (
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
            <li>user Setting</li>
            <li>user Setting</li>
            <li className="move">A</li>
          </ul>
        </div>
        <SettingRight title={name} />
      </div>
    </div>
  );
}
