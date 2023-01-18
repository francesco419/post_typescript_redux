import "./Post.scss";
import styles from "../components/PostBox.module.scss";
import React, { useEffect, useState } from "react";
/*-------------Component------------------------------------- */
import { Header } from "../components/Header";
import PostBox from "../components/PostBox";
import ImageSlide from "../components/ImageSlide";
/*-------------Hooks------------------------------------- */
import timetoday from "../hooks/Timetoday";
/*-------------Component------------------------------------- */
import { ReactComponent as Likes } from "../pictures/likes.svg";
import { ReactComponent as Meatball } from "../pictures/menuMeatball.svg";

export default function Post() {
  const [tagRule, setTagRule] = useState<string>();
  const [tag, setTag] = useState<string[]>([]);

  const onChangeTag = () => {
    const doc = document.getElementById("tag") as HTMLInputElement | null;
    const text: string = doc.value;
    console.log(text);
    const arr = text.split(" ");
    let newArr: string[] = [];
    arr.map((tag) => {
      let temp = tag.trim();
      if (tag.charAt(0) === "#") {
        newArr.push(temp);
      }
    });
    setTag(newArr);
  };

  function PreviewPost() {
    const userInfo = JSON.parse(sessionStorage.getItem("persist:root"));
    if (!userInfo) {
      return;
    }
    const user = JSON.parse(userInfo.user);
    const name: string = user.value.name;
    //const img : string = user.value.

    return (
      <div className={styles["block-outter"]}>
        <div className={styles["block-inner"]}>
          <ImageSlide imgsrc={null} />
          <div className={styles["block-statusbox"]}>
            <div className={styles["block-userstatus"]}>
              <img src={null} alt="myprofile" />
              <p>{name}</p>
              <button id="followbtn">Follow</button>
            </div>
            <div className={styles["block-poststatus"]}>
              <div className={styles["block-poststatus-div"]}>
                {timetoday()}
              </div>
              <Likes className={styles["btn-likes-01-off"]}>Likes</Likes>
              <div className={styles["block-poststatus-report"]}>
                <Meatball width="20px" height="20px" />
                <ul id="send" className={styles["block-poststatus-meatball"]}>
                  <li>Send</li>
                  <li>Send</li>
                  <li>Send</li>
                </ul>
              </div>
            </div>
            <div className={styles["block-textarea"]}>{null}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-post">
      <Header />
      <div className="block-post-inner">
        <div className="block-post-container">
          <div className="block-post-content">
            <button style={{ width: "50px" }}>test</button>
            <h2># 제목</h2>
            <input></input>
            <h2># 내용</h2>
            <textarea></textarea>
            <h2># 태그</h2>
            <input id="tag" onBlur={onChangeTag}></input>
            <p id="tag-example">{"ex) #tag1 #tag2 #tag3"}</p>
            <h2># 이미지</h2>
            <input></input>
          </div>
          <div>
            <PreviewPost />
          </div>
        </div>
      </div>
    </div>
  );
}
