import styles from "./Main.module.scss";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPost } from "../redux/Slices/postSlice";
import {
  selectCounter,
  setCounter,
  moveCounter,
  addCounter,
} from "../redux/Slices/countSlice";
import { Header } from "../components/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PostBox from "../components/PostBox";
import { ReactComponent as ArrowtoRight } from "../pictures/arrow_left.svg";
import { ReactComponent as ArrowtoLeft } from "../pictures/arrow_right.svg";
import { ReactComponent as Spinner } from "../pictures/loading.svg";
import { PostState } from "../redux/Slices/postSlice";

const LazyAbout = React.lazy(() => import("../components/PostBox"));

function Main() {
  const [number, setNumber] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const [postDetail, setPostDetail] = useState<PostState[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const counter = useAppSelector(selectCounter);

  useEffect(() => {
    sendRequest();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let countt: number[] = [];
    for (let i = 0; i < postDetail.length; i++) {
      //setNumber((number) => [...number, i]);
      countt = [...countt, i];
    }
    dispatch(setCounter(countt));
    console.log(counter);
    if (postDetail) {
      dispatch(setPost(postDetail));
    }
    window.scrollTo(0, 0);
  }, [postDetail]);

  const sendRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/fetch/post`);
      if (response) {
        setPostDetail([]);
        for (let i = 0; i < response.data.length; i++) {
          let temp: PostState = {
            user_id: response.data[i].id,
            text: response.data[i].text,
            tag: JSON.parse(response.data[i].tag),
            img: JSON.parse(response.data[i].img),
          };
          setPostDetail((postDetail) => [...postDetail, temp]);
        }
        setTimeout(() => {
          setLoading(true);
        }, 500);
      }
    } catch (e) {
      console.log(e);
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
      {loading ? (
        <div className={styles["slide-box"]}>
          <React.Suspense>
            <div className={styles["slidetest"]}>
              <div id="slide-hidden-right" className={styles["slide-hidden"]}>
                <LazyAbout num={counter[0]} />
              </div>
              <div id="slide-left" className={styles["slide-left"]}>
                <LazyAbout num={counter[1]} />
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
                  move("slide-left", "move-slideO");
                  move("slide-middle", "move-slideL");
                  move("slide-right", "move-slideR");
                  move("slide-hidden-left", "move-slideH");
                  setTimeout(() => {
                    dispatch(moveCounter(true));
                    //asArray(true);
                    btnRight.disabled = false;
                    btnLeft.disabled = false;
                  }, 500);
                }}
              >
                <ArrowtoLeft />
              </button>
              <div id="slide-middle" className={styles["slide-middle"]}>
                <LazyAbout num={counter[2]} />
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
                  console.log(window.innerWidth);
                  setTimeout(() => {
                    dispatch(moveCounter(false));
                    //asArray(false);
                    btnRight.disabled = false;
                    btnLeft.disabled = false;
                  }, 500);
                }}
              >
                <ArrowtoRight />
              </button>
              <div id="slide-right" className={styles["slide-right"]}>
                <LazyAbout num={counter[3]} />
              </div>
              <div id="slide-hidden-left" className={styles["slide-hidden"]}>
                <LazyAbout num={counter[4]} />
              </div>
            </div>
          </React.Suspense>
        </div>
      ) : (
        <div className={styles["loading-spinner"]}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Main;
