import styles from "./Main.module.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setTrue, setFalse, selectLikes } from "../features/counter/likesSlice";

function Main() {
  const likes = useAppSelector(selectLikes);
  const dispatch = useAppDispatch();

  let imgA: string =
    "https://i.ytimg.com/vi/38VAmN6c4DI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDLFFaAec5iqhu5mW3zjASLXqeuiQ";
  return (
    <div className={styles.page_main}>
      <div className={styles.block_outter}>
        <div className={styles.block_inner}>
          <div className={styles.image_box}>
            image_box
            <img src={imgA} />
          </div>
          <div className={styles.block_statusbox}>
            <div className={styles.block_userstatus}>block_userstatus</div>
            <div className={styles.block_poststatus}>
              block_poststatus
              <div className={styles.icon_likes}>
                <button
                  className={styles.button_likes}
                  style={
                    likes
                      ? { backgroundColor: "#ff0000" }
                      : { backgroundColor: "#ffffff" }
                  }
                  onClick={() => {
                    if (likes) {
                      dispatch(setFalse());
                    } else {
                      dispatch(setTrue());
                    }
                  }}
                >
                  Likes
                </button>
                {`state : ${likes}`}
              </div>
            </div>
            <div className={styles.block_textarea}>block_textarea</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
