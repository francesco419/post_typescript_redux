import styles from "./main.module.scss";
import { ReactComponent as Tableview } from "../../pictures/table_view.svg";
import { ReactComponent as Cardview } from "../../pictures/card_view.svg";
import { PostState, selectPost } from "../../redux/Slices/postSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ProfilePost from "../../components/profilePost";
import React, { useState, useEffect } from "react";
import PostTableView from "./postTableView";
import { ReactComponent as Order } from "../../pictures/order.svg";
import { selectFunc, setListOrder } from "../../redux/Slices/funcSlice";
import { Link } from "react-router-dom";
import PostSkeleton from "../../components/postSkeleton";

type Loader = {
  loader: boolean;
};

function MainSection({ loader }: Loader) {
  const [swapView, setSwapView] = useState<Boolean>(true);
  const [checked, setChecked] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const onClickMenuHandler = () => {
    setSwapView((swapView) => !swapView);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText((text) => e.target.value);
  };

  const propsData = {
    text: text,
    check: checked,
  };

  return (
    <div className={styles["main-postBox"]}>
      <div className={styles["main-postBox__topBox"]}>
        <div className={styles["main-postBox__post"]}>
          <Link to={"./Post"}>Write Post</Link>
        </div>
        <div className={styles["main-hideAnnouncement"]}>
          <input
            id="announcement"
            type="checkbox"
            onChange={() => setChecked((checked) => !checked)}
          />
          <label htmlFor="announcement">
            <span>공지사항 숨기기</span>
          </label>
        </div>
        <div className={styles["main-postBox__search"]}>
          <input
            className={styles["main-postBox__search__input"]}
            type="text"
            onChange={(e) => onChangeHandler(e)}
            placeholder="...검색"
          />
        </div>
        <button
          className={styles["main-postBox__swapBtn"]}
          onClick={onClickMenuHandler}
        >
          {swapView ? <Tableview /> : <Cardview />}
        </button>
        <OrderMenu />
        <button
          className={styles["main-postBox__upBtn"]}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          ↑
        </button>
      </div>
      {loader ? (
        <PostSkeleton />
      ) : swapView ? (
        <MainPost text={text} check={checked} />
      ) : (
        <PostTableView />
      )}
    </div>
  );
}

type Text = {
  text: string;
  check: boolean;
};

function MainPost({ text, check }: Text) {
  const post = useAppSelector(selectPost);
  const order = useAppSelector(selectFunc);
  const [postList, setPostList] = useState<PostState[]>([...post.value]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (text) {
      sample(text, check);
    } else {
      sample("", check);
    }
  }, [order.value.listOrder, text, check]);

  function sample(text?: string, check?: boolean) {
    setLoading(true); //로딩시작
    let arr: PostState[] = [...post.value];
    let result: PostState[] = [];
    if (text) {
      //검색 텍스트 존재시 필터링
      arr = arr.filter((data) => data.text.includes(text));
    }
    if (check) {
      //공지사항 필터링
      arr = arr.filter((data) => {
        if (data.announcement === false) {
          return data;
        }
      });
    }
    if (order.value.listOrder === "최신순") {
      //게시물 정렬
      result = arr.reverse();
      setPostList((postList) => result);
    } else if (order.value.listOrder === "댓글순") {
      result = arr.sort((a, b) => {
        return (
          parseInt(a.date.replaceAll("-", "")) -
          parseInt(b.date.replaceAll("-", ""))
        );
      });
      setPostList((postList) => result);
    } else if (order.value.listOrder === "추천순") {
      result = arr.filter((postList) => postList.tag.length > 1);
      setPostList((postList) => result);
    }
    setLoading(false); //로딩 끝
  }

  const sortAnnounce = (a: PostState, b: PostState): number => {
    if (a.announcement === false && b.announcement === true) {
      return 1;
    }
    if (a.announcement === true && b.announcement === false) {
      return -1;
    }
    if (a.announcement === b.announcement) {
      return 0;
    }
  };

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <>
        {postList
          .sort((a, b) => sortAnnounce(a, b))
          .map((data, index) => {
            return <ProfilePost postState={data} index={index} />;
          })}
      </>
    );
  }
}

function OrderMenu() {
  const order = useAppSelector(selectFunc);
  const dispatch = useAppDispatch();
  const LISTTEXT = ["최신순", "추천순", "댓글순"];
  const [orders, setOrders] = useState<boolean>(false);

  const onClickMenuHandler = () => {
    setOrders((orders) => !orders);
  };

  const changeListTextHandler = (num: number) => {
    dispatch(setListOrder(LISTTEXT[num]));
  };

  return (
    <div className={styles["main-postBox__order"]} onClick={onClickMenuHandler}>
      <Order />
      <p>{order.value.listOrder}</p>
      {orders && (
        <div className={styles["main-postBox__order__hidden"]}>
          <button type="button" onClick={() => changeListTextHandler(0)}>
            최신순
          </button>
          <button type="button" onClick={() => changeListTextHandler(1)}>
            추천순
          </button>
          <button type="button" onClick={() => changeListTextHandler(2)}>
            댓글순
          </button>
        </div>
      )}
    </div>
  );
}

export default MainSection;
