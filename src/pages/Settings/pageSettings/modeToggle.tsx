import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectFunc, setDarkMode } from "../../../redux/Slices/funcSlice";
import { Alertpopup } from "../../../components/extra/alertpopup";
import styles from "./toggle.module.scss";

export function ModeToggle() {
  const funcmode = useAppSelector(selectFunc);
  const dispatch = useAppDispatch();

  return (
    <div className={styles["block-pageSetting-toggle"]}>
      <h4>DarkMode : </h4>
      <input
        type="checkbox"
        id="dark"
        name="DarkMode"
        checked={funcmode.value.dark}
        onChange={(e) => dispatch(setDarkMode(e.target.checked))}
      />
      <label htmlFor="dark">setting theme to darkmode</label>
      <Alertpopup text="setting theme to darkmode" />
    </div>
  );
}
