import { ReactComponent as Spinner } from "../../pictures/loading.svg";
import styles from "./extra.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles["loading-spinner"]}>
      <Spinner />
    </div>
  );
}
