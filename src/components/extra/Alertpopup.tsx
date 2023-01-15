import styles from "./Alertpopup.module.scss";
import { getPositionOfLineAndCharacter } from "typescript";
import { ReactComponent as Info } from "../../pictures/info.svg";
import { useEffect } from "react";

interface ChildTypes {
  text: string;
  width?: number;
  height?: number;
}

export const Alertpopup = ({ text, width, height }: ChildTypes) => {
  return (
    <div className={styles["container"]}>
      <Info
        width={width ? `${width}px` : "20px"}
        height={height ? `${height}px` : "20px"}
      />
      <div className={styles["textbox"]}>
        <div>{text}</div>
      </div>
    </div>
  );
};
