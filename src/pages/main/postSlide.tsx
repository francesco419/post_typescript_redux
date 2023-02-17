import styles from "./main.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCounter, moveCounter } from "../../redux/Slices/countSlice";
import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowtoRight } from "../../pictures/arrow_left.svg";
import { ReactComponent as ArrowtoLeft } from "../../pictures/arrow_right.svg";
import PostComp from "./postComp";

export default function PostSlide(state: any) {
  const dispatch = useAppDispatch();
  const counter = useAppSelector(selectCounter);

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
      <div className={styles["slide-box"]}>
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
      </div>
    </div>
  );
}
