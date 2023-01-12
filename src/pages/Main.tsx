import styles from "./Main.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLikes, selectLikes } from "../redux/likes/likesSlice";
import { selectUser } from "../redux/user/userSlice";
import { Header } from "../components/Header";
import ImageSlide from "../components/ImageSlide";
import axios from "axios";
import { useEffect, useState } from "react";

function Main() {
  const likes = useAppSelector(selectLikes);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [naming, setNaming] = useState<string>();

  const timetoday = () => {
    let now: Date = new Date();
    let nowYear: number = now.getFullYear();
    let nowMonth: number = now.getMonth() + 1;
    let nowDate: number = now.getDate();

    return `${nowYear}-${nowMonth}-${nowDate}`;
  };

  let imgA: string =
    "https://i.ytimg.com/vi/38VAmN6c4DI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDLFFaAec5iqhu5mW3zjASLXqeuiQ";

  useEffect(() => {
    //fetchData();
  }, []);

  const fetchData = async () => {
    const type: string = "sound";
    const named: string = "dog";
    //${type}/${named}
    try {
      const response = await axios.get(`http://localhost:8080/`);
      console.log(response.data);
      console.log("fetch!");
    } catch (e) {
      console.log(e);
    }
  };

  function Mainbox() {
    return (
      <div className={styles["block-outter"]}>
        <div className={styles["block-inner"]}>
          {/* <div className={styles["image-box"]}>
            <img src={imgA} />
          </div> */}
          <ImageSlide></ImageSlide>
          <div className={styles["block-statusbox"]}>
            <div className={styles["block-userstatus"]}>
              <p>{user.username ? user.username : "No-One"}</p>
              <div>Follow</div>
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
              <div
                className={styles["block-poststatus-report"]}
                onClick={() => {
                  document
                    .getElementById("block-poststatus-report")
                    .classList.add("block-poststatus-report-animate");
                }}
              >
                ···
              </div>
            </div>
            <div className={styles["block-textarea"]}>오늘하루 뭐한건가...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["page-main"]}>
      <Header />
      <Mainbox />
    </div>
  );
}

export default Main;
