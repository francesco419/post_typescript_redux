import styles from "./Main.module.scss";
import { Header } from "../components/header/Header";
import PostSlide from "../components/main/PostSlide";

function Main() {
  return (
    <div className={styles["page-main"]}>
      <Header />
      <PostSlide />
    </div>
  );
}

export default Main;
