import styles from "./Main.module.scss";
import { Header } from "../components/header/Header";
import PostSlide from "../components/main/PostSlide";
import { useState } from "react";
import PostTableView from "../components/main/PostTableView";
import { ReactComponent as Tableview } from "../pictures/table_view.svg";
import { ReactComponent as Cardview } from "../pictures/card_view.svg";
import { selectFunc, setSwapView } from "../redux/Slices/funcSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

function Main() {
  const func = useAppSelector(selectFunc);
  const dispatch = useAppDispatch();
  return (
    <div className={styles["page-main"]}>
      <Header />
      <button
        className={styles["btn-main-swapview"]}
        onClick={() => {
          dispatch(setSwapView());
        }}
      >
        {func.value.swapView ? <Tableview /> : <Cardview />}
      </button>
      {func.value.swapView ? <PostSlide /> : <PostTableView />}
    </div>
  );
}

export default Main;
