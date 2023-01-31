import styles from "./PostBox.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
//import { setLikes, selectLikes } from "../redux/Slices/likesSlice";
import { selectUser } from "../../redux/Slices/userSlice";
import ImageSlide from "./ImageSlide";
import { useEffect, useState } from "react";
//import { ReactComponent as Likes } from "../pictures/likes.svg";
import { ReactComponent as Meatball } from "../../pictures/menuMeatball.svg";
import { Link } from "react-router-dom";
import { PostState, selectPost } from "../../redux/Slices/postSlice";

type numProp = {
  num: number;
};

export default function PostBox(num: numProp) {
  const [display, setDisplay] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const post = useAppSelector(selectPost);
  const [test, setTest] = useState<PostState>();
  const dull: string = "https://cdn-icons-png.flaticon.com/512/666/666201.png";

  //const likes = useAppSelector(selectLikes);
  //const dispatch = useAppDispatch();

  useEffect(() => {
    setTest((test) => post.value[num.num]);
    setLoading(true);
  }, []);

  useEffect(() => {
    setTest((test) => post.value[num.num]);
  }, [num.num]);

  return (
    <div className={styles["block-outter"]}>
      {loading ? (
        <div className={styles["block-inner"]}>
          <ImageSlide imgsrc={test.img} />
          <div className={styles["block-statusbox"]}>
            <div className={styles["block-userstatus"]}>
              <img
                src={user.value.img !== "null" ? user.value.img : dull}
                alt="myprofile"
              />
              <p>{test.name}</p>
              <button id="followbtn">Follow</button>
            </div>
            <div className={styles["block-poststatus"]}>
              <div className={styles["block-poststatus-div"]}>{test.date}</div>
              {/* <Likes
                className={styles["btn-likes-01-off"]}
                fill={likes ? "#ff0000" : "#616161"}
                onClick={() => dispatch(setLikes())}
              >
                Likes
              </Likes> */}
              <div
                className={styles["block-poststatus-report"]}
                onClick={() => setDisplay((display) => !display)}
              >
                <Meatball width="20px" height="20px" />
                <ul
                  id="send"
                  className={styles["block-poststatus-meatball"]}
                  style={{ display: display ? "block" : "none" }}
                >
                  <li>
                    <button>Send</button>
                  </li>
                  <li>
                    <button>Block</button>
                  </li>
                  <li>
                    <button>Save</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles["block-textarea"]}>
              {test.text.length < 100
                ? test.text
                : `${test.text.slice(0, 100)} ······`}
            </div>
            <div className={styles["block-tag"]}>
              {test.tag.map((tag_: string, index) => (
                <Link
                  className={styles["link-postbox-to"]}
                  to={`/Search/${tag_}`}
                  key={`${tag_}${index}`}
                >
                  {tag_}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>Loading</h1>
      )}
    </div>
  );
}
