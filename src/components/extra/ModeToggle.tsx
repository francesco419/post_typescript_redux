import styles from "./ModeToggle.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectDark, setDarkMode } from "../../redux/Slices/darkSlice";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const darkmode = useAppSelector(selectDark);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const doc = document.getElementById("toggle") as HTMLInputElement | null;
    const theme: string = sessionStorage.getItem("theme");
    if (doc && theme) {
      if (theme === "dark") {
        doc.checked = true;
      }
    }
  });
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
