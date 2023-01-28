import styles from "./Main.module.scss";
import { Header } from "../components/Header";
import PostSlide from "../components/PostSlide";

function Main() {
  return (
    <div className={styles["page-main"]}>
      <Header />
      <PostSlide />
    </div>
  );
}

export default Main;
