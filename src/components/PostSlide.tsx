import styles from "../pages/Main.module.scss";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPost } from "../redux/Slices/postSlice";
import {
  selectCounter,
  setCounter,
  moveCounter,
} from "../redux/Slices/countSlice";
import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowtoRight } from "../pictures/arrow_left.svg";
import { ReactComponent as ArrowtoLeft } from "../pictures/arrow_right.svg";
import { PostState } from "../redux/Slices/postSlice";
import { sendAxiosState } from "../functions/APIInterceptor";
import { getInterceptor } from "../functions/APIInterceptor";
import { AxiosResponse } from "axios";
import LoadingSpinner from "./extra/LoadingSpinner";

const LazyAbout = React.lazy(() => import("../components/PostBox"));

export default function PostSlide() {
  const dispatch = useAppDispatch();
  const [postDetail, setPostDetail] = useState<PostState[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const counter = useAppSelector(selectCounter);

  useEffect(() => {
    sendRequest();
    return () => {
      sendRequest();
    };
  }, []);

  useEffect(() => {
    resetCount();
    return () => {
      resetCount();
    };
  }, [postDetail]);

  const resetCount = () => {
    let countt: number[] = [];
    postDetail.map((x, index) => {
      countt = [...countt, index];
    });
    dispatch(setCounter(countt));
    if (postDetail) {
      dispatch(setPost(postDetail));
    }
  };

  const postCallback = (response: AxiosResponse<any, any>) => {
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
  };

  const sendRequest = () => {
    let data: sendAxiosState = {
      url: `http://localhost:8080/fetch/post`,
      config: null,
      callback: postCallback,
    };

    getInterceptor(data);
  };

  const move = (id: string, style: string) => {
    const doc = document.getElementById(id) as HTMLDivElement | null;
    //doc.classList.remove(styles["slide-middle"]);
    doc.classList.add(styles[style]);
    setTimeout(() => {
      doc.classList.remove(styles[style]);
    }, 250);
  };

  const onClickhandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bool: boolean
  ) => {
    const btnRight = document.getElementById(
      "slide-right-btn"
    ) as HTMLButtonElement | null;
    const btnLeft = document.getElementById(
      "slide-left-btn"
    ) as HTMLButtonElement | null;

    btnRight.disabled = true;
    btnLeft.disabled = true;

    if (bool) {
      move("slide-left", "move-slideO");
      move("slide-middle", "move-slideL");
      move("slide-right", "move-slideR");
      move("slide-hidden-left", "move-slideH");
    } else {
      move("slide-hidden-right", "move-Hslide");
      move("slide-left", "move-Oslide");
      move("slide-middle", "move-Lslide");
      move("slide-right", "move-Rslide");
    }

    setTimeout(() => {
      dispatch(moveCounter(bool));
      //asArray(true);
      btnRight.disabled = false;
      btnLeft.disabled = false;
    }, 240);
  };

  return (
    <div>
      {loading ? (
        <div className={styles["slide-box"]}>
          <React.Suspense>
            <div className={styles["slidetest"]}>
              <div id="slide-hidden-right" className={styles["slide-hidden"]}>
                <LazyAbout num={counter[counter.length - 2]} />
              </div>
              <div id="slide-left" className={styles["slide-left"]}>
                <LazyAbout num={counter[counter.length - 1]} />
              </div>
              <button
                id="slide-left-btn"
                className={styles["btn-slide-left"]}
                onClick={(e) => {
                  onClickhandler(e, false);
                }}
              >
                <ArrowtoLeft />
              </button>
              <div id="slide-middle" className={styles["slide-middle"]}>
                <LazyAbout num={counter[0]} />
              </div>
              <button
                id="slide-right-btn"
                className={styles["btn-slide-right"]}
                onClick={(e) => {
                  onClickhandler(e, true);
                }}
              >
                <ArrowtoRight />
              </button>
              <div id="slide-right" className={styles["slide-right"]}>
                <LazyAbout num={counter[1]} />
              </div>
              <div id="slide-hidden-left" className={styles["slide-hidden"]}>
                <LazyAbout num={counter[2]} />
              </div>
            </div>
          </React.Suspense>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
