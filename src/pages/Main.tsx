import styles from "./Main.module.scss";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLikes, selectLikes } from "../redux/Slices/likesSlice";
import { selectUser } from "../redux/Slices/userSlice";
import { Header } from "../components/Header";
//import axios from "axios";
import { useEffect, useState } from "react";
import PostBox from "../components/PostBox";
import { ReactComponent as ArrowtoRight } from "../pictures/arrow_left.svg";
import { ReactComponent as ArrowtoLeft } from "../pictures/arrow_right.svg";

function Main() {
  const [number, setNumber] = useState<number[]>([0, 1, 2, 3]);

  const asArray = (bool: boolean) => {
    if (bool) {
      let arr = [...number];
      let temp: number = arr.shift();
      arr.push(temp);
      setNumber((number) => arr);
    } else {
      let arr = [...number];
      let temp: number = arr.pop();
      arr.unshift(temp);
      setNumber((number) => arr);
    }
  };

  const move = (id: string, style: string) => {
    const doc = document.getElementById(id) as HTMLDivElement | null;
    //doc.classList.remove(styles["slide-middle"]);
    doc.classList.add(styles[style]);
    setTimeout(() => {
      doc.classList.remove(styles[style]);
    }, 500);
  };

  return (
    <div className={styles["page-main"]}>
      <Header />
      <div className={styles["slide-box"]}>
        <div className={styles["slidetest"]}>
          <div id="slide-hidden-right" className={styles["slide-hidden"]}>
            <PostBox imgsrc={number[number.length - 1]} />
          </div>
          <div id="slide-left" className={styles["slide-left"]}>
            <PostBox imgsrc={number[0]} />
          </div>
          <button
            id="slide-left-btn"
            className={styles["btn-slide-left"]}
            onClick={(e) => {
              const btnRight = document.getElementById(
                "slide-right-btn"
              ) as HTMLButtonElement | null;
              const btnLeft = document.getElementById(
                "slide-left-btn"
              ) as HTMLButtonElement | null;
              btnRight.disabled = true;
              btnLeft.disabled = true;
              //move("slide-hidden-right", "move-slideH");
              move("slide-left", "move-slideO");
              move("slide-middle", "move-slideL");
              move("slide-right", "move-slideR");
              move("slide-hidden-left", "move-slideH");
              console.log(window.innerWidth);
              setTimeout(() => {
                asArray(true);
                btnRight.disabled = false;
                btnLeft.disabled = false;
              }, 500);
            }}
          >
            <ArrowtoLeft />
          </button>
          <div id="slide-middle" className={styles["slide-middle"]}>
            <PostBox imgsrc={number[1]} />
          </div>
          <button
            id="slide-right-btn"
            className={styles["btn-slide-right"]}
            onClick={(e) => {
              const btnRight = document.getElementById(
                "slide-right-btn"
              ) as HTMLButtonElement | null;
              const btnLeft = document.getElementById(
                "slide-left-btn"
              ) as HTMLButtonElement | null;
              btnRight.disabled = true;
              btnLeft.disabled = true;
              move("slide-hidden-right", "move-Hslide");
              move("slide-left", "move-Oslide");
              move("slide-middle", "move-Lslide");
              move("slide-right", "move-Rslide");
              //move("slide-hidden-left", "move-Hslide");
              console.log(window.innerWidth);
              setTimeout(() => {
                asArray(false);
                btnRight.disabled = false;
                btnLeft.disabled = false;
              }, 500);
            }}
          >
            <ArrowtoRight />
          </button>
          <div id="slide-right" className={styles["slide-right"]}>
            <PostBox imgsrc={number[2]} />
          </div>
          <div id="slide-hidden-left" className={styles["slide-hidden"]}>
            <PostBox imgsrc={number[3]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

/* let imgA: string =
  "https://i.ytimg.com/vi/38VAmN6c4DI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDLFFaAec5iqhu5mW3zjASLXqeuiQ";

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
};*/
