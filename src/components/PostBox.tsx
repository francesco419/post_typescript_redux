import styles from "./PostBox.module.scss";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLikes, selectLikes } from "../redux/Slices/likesSlice";
import { selectUser } from "../redux/Slices/userSlice";
import ImageSlide from "./ImageSlide";
import { useEffect, useState } from "react";
import { ReactComponent as Likes } from "../pictures/likes.svg";
import { ReactComponent as Meatball } from "../pictures/menuMeatball.svg";
import { Link } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/types/setup/directApi";

interface PostDetail {
  id: string;
  text: string;
  tag: string[];
  img: string[];
}

type numProp = {
  num: number;
};

export default function PostBox(num: numProp) {
  const [display, setDisplay] = useState<boolean>(false);
  const likes = useAppSelector(selectLikes);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [test, setTest] = useState<PostDetail>();
  useEffect(() => {
    const persist = JSON.parse(sessionStorage.getItem("persist:root"));
    setTest((test) => JSON.parse(persist.post).value[num.num]);
    setLoading(true);
  }, []);

  useEffect(() => {
    const persist = JSON.parse(sessionStorage.getItem("persist:root"));
    console.log(num.num);
    setTest((test) => JSON.parse(persist.post).value[num.num]);
  }, [num.num]);

  const timetoday = () => {
    let now: Date = new Date();
    let nowYear: number = now.getFullYear();
    let nowMonth: number = now.getMonth() + 1;
    let nowDate: number = now.getDate();

    return `${nowYear}-${nowMonth}-${nowDate}`;
  };
  return (
    <div className={styles["block-outter"]}>
      {loading ? (
        <div className={styles["block-inner"]}>
          <ImageSlide imgsrc={test.img} />
          <div className={styles["block-statusbox"]}>
            <div className={styles["block-userstatus"]}>
              <img src={user.img} alt="myprofile" />
              <p>{test.id}</p>
              <button id="followbtn">Follow</button>
            </div>
            <div className={styles["block-poststatus"]}>
              <div className={styles["block-poststatus-div"]}>
                {timetoday()}
              </div>
              <Likes
                className={styles["btn-likes-01-off"]}
                fill={likes ? "#ff0000" : "#616161"}
                onClick={() => dispatch(setLikes())}
              >
                Likes
              </Likes>
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
                  <li>Send</li>
                  <li>Send</li>
                  <li>Send</li>
                </ul>
              </div>
            </div>
            <div className={styles["block-textarea"]}>
              {/*  {detail
              ? detail.text.length < 100
                ? text
                : `${text.slice(0, 100)} ······`
              : "일없음..."} */}
              {test.text.length < 100
                ? test.text
                : `${test.text.slice(0, 100)} ······`}
            </div>
            <div className={styles["block-tag"]}>
              {test.tag.map((tag_: string) => (
                <Link className={styles["link-postbox-to"]} to={"/"}>
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
