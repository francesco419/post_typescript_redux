import "./PageSetting.scss";
import { ModeToggle } from "../extra/ModeToggle";
import { useAppSelector } from "../../redux/hooks";
import { selectDark } from "../../redux/Slices/darkSlice";
import { Alertpopup } from "../extra/Alertpopup";

export function PageSetting() {
  const darkmode = useAppSelector(selectDark);
  return (
    <div className="block-pagesettings-display">
      <div className="block-darkmode">
        <p>DarkMode : </p>
        <div>
          <ModeToggle />
        </div>
        <p> setting theme to darkmode</p>
        <Alertpopup text="setting theme to darkmode" />
      </div>
    </div>
  );
}

//darkmode,
