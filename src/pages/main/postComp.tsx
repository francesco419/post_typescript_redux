import styles from "./main.module.scss";
import { selectCounter } from "../../redux/Slices/countSlice";
import { useAppSelector } from "../../redux/hooks";
import React from "react";
import PostBox from "../post/postBox";

export interface Mainpost {
  value: {
    id: string;
    classname: string;
    counterLength: number;
  };
}

export default function PostComp(data: Mainpost) {
  const counter = useAppSelector(selectCounter);
  return (
    <div id={`${data.value.id}`} className={styles[`${data.value.classname}`]}>
      <PostBox num={counter[data.value.counterLength]} />
    </div>
  );
}
