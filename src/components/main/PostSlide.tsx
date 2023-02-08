import styles from "../../pages/Main.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPost } from "../../redux/Slices/postSlice";
import {
  selectCounter,
  setCounter,
  moveCounter,
} from "../../redux/Slices/countSlice";
import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowtoRight } from "../../pictures/arrow_left.svg";
import { ReactComponent as ArrowtoLeft } from "../../pictures/arrow_right.svg";
import { PostState } from "../../redux/Slices/postSlice";
import { sendAxiosState } from "../../functions/APIInterceptor";
import { getInterceptor } from "../../functions/APIInterceptor";
import { AxiosResponse } from "axios";
import LoadingSpinner from "../extra/LoadingSpinner";
import PostComp from "./PostComp";
import { setImagePath } from "../../functions/setImagePath";
import { selectPost } from "../../redux/Slices/postSlice";

export interface Mainpost {
  value: {
    id: string;
    classname: string;
    counterLength: number;
  };
}

export default function PostSlide() {
  const dispatch = useAppDispatch();
  const [postDetail, setPostDetail] = useState<PostState[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const counter = useAppSelector(selectCounter);
  const post = useAppSelector(selectPost);

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

  /** ------------통신----------------------  */

  const postCallback = (response: AxiosResponse<any, any>) => {
    setPostDetail([]);
    for (let i = 0; i < response.data.length; i++) {
      let temp: PostState = {
        id: response.data[i].id,
        name: response.data[i].name,
        text: response.data[i].text,
        tag: JSON.parse(response.data[i].tag),
        date: response.data[i].date,
        img: setImagePath(response.data[i].img),
        code: response.data[i].code,
      };
      setPostDetail((postDetail) => [...postDetail, temp]);
      console.log(11);
    }
    setLoading(true);
  };

  const sendRequest = () => {
    let data: sendAxiosState = {
      url: `http://localhost:8080/fetch/post`,
      data: null,
      config: null,
      callback: postCallback,
    };
    getInterceptor(data);
  };

  /** ------------counter reducer 초기화----------------------  */

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

  /** ------------슬라이드 이동----------------------  */

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
              <PostComp
                value={{
                  id: "slide-hidden-right",
                  classname: "slide-hidden",
                  counterLength: counter.length - 2,
                }}
              />
              <PostComp
                value={{
                  id: "slide-left",
                  classname: "slide-left",
                  counterLength: counter.length - 1,
                }}
              />
              <button
                id="slide-left-btn"
                className={styles["btn-slide-left"]}
                onClick={(e) => {
                  onClickhandler(e, false);
                }}
              >
                <ArrowtoLeft />
              </button>
              <PostComp
                value={{
                  id: "slide-middle",
                  classname: "slide-middle",
                  counterLength: 0,
                }}
              />
              <button
                id="slide-right-btn"
                className={styles["btn-slide-right"]}
                onClick={(e) => {
                  onClickhandler(e, true);
                }}
              >
                <ArrowtoRight />
              </button>
              <PostComp
                value={{
                  id: "slide-right",
                  classname: "slide-right",
                  counterLength: 1,
                }}
              />
              <PostComp
                value={{
                  id: "slide-hidden-left",
                  classname: "slide-hidden",
                  counterLength: 2,
                }}
              />
            </div>
          </React.Suspense>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
