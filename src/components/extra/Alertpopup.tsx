import styles from "./extra.module.scss";
import { ReactComponent as Info } from "../../pictures/info.svg";

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
        <p>{text}</p>
      </div>
    </div>
  );
};
