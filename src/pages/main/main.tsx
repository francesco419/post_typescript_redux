import styles from "./main.module.scss";
import { Header } from "../../components/header/header";
import PostSlide from "./postSlide";
import React, { useEffect, useState } from "react";
import PostTableView from "./postTableView";
import { ReactComponent as Tableview } from "../../pictures/table_view.svg";
import { ReactComponent as Cardview } from "../../pictures/card_view.svg";
import { selectFunc, setSwapView } from "../../redux/Slices/funcSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setImagePath } from "../../functions/setImagePath";
import { PostState } from "../../redux/Slices/postSlice";
import { AxiosResponse } from "axios";
import { sendAxiosState } from "../../functions/APIInterceptor";
import { getsInterceptor } from "../../functions/APIInterceptor";
import { selectPost } from "../../redux/Slices/postSlice";
import { setPost } from "../../redux/Slices/postSlice";
import { range } from "../../functions/range";
import LoadingSpinner from "../../components/extra/loadingSpinner";
import {
  selectCounter,
  setCounter,
  moveCounter,
} from "../../redux/Slices/countSlice";

const LazyAbout = React.lazy(() => import("./postSlide"));

function Main() {
  const func = useAppSelector(selectFunc);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const post = useAppSelector(selectPost);

  const postCallback = (response: AxiosResponse<any, any>) => {
    let arr: PostState[] = [];

    response.data.forEach((data: any) => {
      let temp: PostState = {
        id: data.id,
        name: data.name,
        text: data.text,
        tag: JSON.parse(data.tag),
        date: data.date,
        img: setImagePath(data.img),
        code: data.code,
      };
      arr.push(temp);
    });

    dispatch(setPost(arr));
    resetCount();
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  const sendRequest = () => {
    let data: sendAxiosState = {
      url: `http://localhost:8080/fetch/post`,
      data: null,
      config: null,
      callback: postCallback,
    };
    getsInterceptor(data);
  };

  let resource = sendRequest();

  useEffect(() => {}, []);

  /** ------------통신----------------------  */

  /** ------------counter reducer 초기화----------------------  */

  const resetCount = () => {
    let num: number[] = range(0, post.value.length);
    dispatch(setCounter(num));
  };

  return (
    <div className={styles["page-main"]}>
      <Header />
      {loading ? (
        <>
          <button
            className={styles["btn-main-swapview"]}
            onClick={() => {
              dispatch(setSwapView());
            }}
          >
            {func.value.swapView ? <Tableview /> : <Cardview />}
          </button>
          <React.Suspense fallback={<LoadingSpinner />}>
            <LazyAbout state={resource} />
          </React.Suspense>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default Main;
