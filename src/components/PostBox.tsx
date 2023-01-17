import styles from "./PostBox.module.scss";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLikes, selectLikes } from "../redux/Slices/likesSlice";
import { selectUser } from "../redux/Slices/userSlice";
import { Header } from "./Header";
import ImageSlide from "./ImageSlide";
import { useEffect, useState } from "react";
import { ReactComponent as Likes } from "../pictures/likes.svg";
import { ReactComponent as Meatball } from "../pictures/menuMeatball.svg";

interface PostProps {
  imgsrc: number;
}

export default function PostBox(imgsrc: PostProps) {
  const likes = useAppSelector(selectLikes);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [naming, setNaming] = useState<string>();
  const [display, setDisplay] = useState<boolean>(false);

  const [image, setImage] = useState<string[]>([
    "https://img.freepik.com/premium-vector/wild-west-flat-illustration_215665-426.jpg?w=2000",
    "https://i.pinimg.com/736x/a7/58/94/a758947f6dcebe6c863eba9580eb15b9.jpg",
    "https://yt3.googleusercontent.com/9fSIeW-tkGl9sfajW9yLWe73bQEHm1kXarHNRpxyJP8o2szvmNPYvR9FXymiyEyjthasbYWL6Bg=s900-c-k-c0x00ffffff-no-rj",
    "https://blog.kakaocdn.net/dn/cSOL0i/btqw6pg4f1h/4LWZ1Whic20CtxwJoOYgDk/img.png",
  ]);

  const text: string =
    "오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...오늘하루 뭐한건가...";

  const timetoday = () => {
    let now: Date = new Date();
    let nowYear: number = now.getFullYear();
    let nowMonth: number = now.getMonth() + 1;
    let nowDate: number = now.getDate();

    return `${nowYear}-${nowMonth}-${nowDate}`;
  };

  return (
    <div className={styles["block-outter"]}>
      <div className={styles["block-inner"]}>
        <ImageSlide imgsrc={image[imgsrc.imgsrc]} />
        <div className={styles["block-statusbox"]}>
          <div className={styles["block-userstatus"]}>
            <img src={user.img} />
            <p>{user.name}</p>
            <button id="followbtn">Follow</button>
          </div>
          <div className={styles["block-poststatus"]}>
            <div className={styles["block-poststatus-div"]}>{timetoday()}</div>
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
            {text.length < 150 ? text : `${text.slice(0, 150)} ······`}
          </div>
        </div>
      </div>
    </div>
  );
}
