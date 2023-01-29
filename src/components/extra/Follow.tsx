import { useEffect } from "react";
import styles from "./Extra.module.scss";

export function Follow() {
  function pointermove(string: string) {
    const move = document.getElementById(string);
    document.addEventListener("mousemove", (e: MouseEvent) => {
      move.style.left = e.clientX + "px";
      move.style.top = e.clientY + "px";
    });
  }
  useEffect(() => {
    pointermove("follow");
  });
  return (
    <div id="follow" className={styles["follow"]}>
      <div className={styles["circle1"]}></div>
      <div className={styles["circle2"]}></div>
    </div>
  );
}
