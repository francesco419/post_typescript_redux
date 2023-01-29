import { Mainpost } from "./PostSlide";
import styles from "../pages/Main.module.scss";
import { selectCounter } from "../redux/Slices/countSlice";
import { useAppSelector } from "../redux/hooks";
import React from "react";

const LazyAbout = React.lazy(() => import("../components/PostBox"));

export default function PostComp(data: Mainpost) {
  const counter = useAppSelector(selectCounter);
  return (
    <div id={`${data.value.id}`} className={styles[`${data.value.classname}`]}>
      <LazyAbout num={counter[data.value.counterLength]} />
    </div>
  );
}
