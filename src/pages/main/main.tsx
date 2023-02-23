import styles from "./main.module.scss";
import { Header } from "../../components/header/header";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setImagePath } from "../../functions/setImagePath";
import { PostState } from "../../redux/Slices/postSlice";
import { AxiosResponse } from "axios";
import { sendAxiosState } from "../../functions/APIInterceptor";
import { getInterceptor } from "../../functions/APIInterceptor";
import { selectPost } from "../../redux/Slices/postSlice";
import { setPost } from "../../redux/Slices/postSlice";
import { range } from "../../functions/range";
import { setCounter } from "../../redux/Slices/countSlice";
import MainSection from "./mainSection";
import { selectUser } from "../../redux/Slices/userSlice";

function Main() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const post = useAppSelector(selectPost);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    sendRequest();
  }, []);

  /** ------------통신----------------------  */

  const sendRequest = () => {
    let data: sendAxiosState = {
      url: `http://localhost:8080/fetch/post`,
      callback: postCallback,
    };
    getInterceptor(data);
  };

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
        commentCount: data.commentCount,
      };
      arr.push(temp);
    });

    dispatch(setPost(arr));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  /** ------------counter reducer 초기화----------------------  */

  const resetCount = () => {
    let num: number[] = range(0, post.value.length);
    dispatch(setCounter(num));
  };

  return (
    <div className={styles["page-main"]}>
      <Header />
      <MainSection loader={loading} />
    </div>
  );
}

export default Main;
