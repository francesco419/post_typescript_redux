import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-inner"]}>
        <Link className={styles["header-link"]} to={`/`}>
          Home
        </Link>
        <Link className={styles["header-link"]} to={`/Login`}>
          Login
        </Link>
      </div>
    </div>
  );
}
