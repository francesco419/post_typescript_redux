import styles from "./ModeToggle.module.scss";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectDark, setDarkMode } from "../redux/dark/darkSlice";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const darkmode = useAppSelector(selectDark);
  const dispatch = useAppDispatch();
  return (
    <div>
      <input
        type="checkbox"
        id="toggle"
        name="DarkMode"
        checked={darkmode}
        onChange={(e) => dispatch(setDarkMode(e.target.checked))}
      />
    </div>
  );
}
