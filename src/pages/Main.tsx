import styles from "./Main.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLikes, selectLikes } from "../redux/likes/likesSlice";
import { selectUser } from "../redux/user/userSlice";
import { Header } from "../components/Header";

function Main() {
  const likes = useAppSelector(selectLikes);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const timetoday = () => {
    let now = new Date();
    let nowYear = now.getFullYear();
    let nowMonth = now.getMonth() + 1;
    let nowDate = now.getDate();
    const week = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let nowDay = week[now.getDay()];

    return `${nowYear}-${nowMonth}-${nowDate}`;
  };

  let imgA: string =
    "https://i.ytimg.com/vi/38VAmN6c4DI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDLFFaAec5iqhu5mW3zjASLXqeuiQ";

  return (
    <div className={styles["page-main"]}>
      <Header />
      <div className={styles["block-outter"]}>
        <div className={styles["block-inner"]}>
          <div className={styles["image-box"]}>
            <img src={imgA} />
          </div>
          <div className={styles["block-statusbox"]}>
            <div className={styles["block-userstatus"]}>
              <p>{user.username ? user.username : "null"}</p>
            </div>
            <div className={styles["block-poststatus"]}>
              <div className={styles["icon-likes"]}>
                <button
                  className={styles["btn-likes-01-off"]}
                  style={
                    likes
                      ? { backgroundColor: "#ff0000" }
                      : { backgroundColor: "#ffffff" }
                  }
                  onClick={() => dispatch(setLikes())}
                >
                  Likes
                </button>
              </div>
              <div className={styles["block-poststatus-send"]}>Send</div>
              <div className={styles["block-poststatus-date"]}>
                {timetoday()}
              </div>
            </div>
            <div className={styles["block-textarea"]}>오늘하루 뭐한건가...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
