import styles from "./main.module.scss";
import { selectCounter } from "../../redux/Slices/countSlice";
import { useAppSelector } from "../../redux/hooks";
import React from "react";

export interface Mainpost {
  value: {
    id: string;
    classname: string;
    counterLength: number;
  };
}

const LazyAbout = React.lazy(() => import("../post/postBox"));

export default function PostComp(data: Mainpost) {
  const counter = useAppSelector(selectCounter);
  return (
    <div id={`${data.value.id}`} className={styles[`${data.value.classname}`]}>
      <LazyAbout num={counter[data.value.counterLength]} />
    </div>
  );
}
