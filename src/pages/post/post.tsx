import "./post.scss";
import styles from "./postBox.module.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router";
/*-------------Component------------------------------------- */
import { Header } from "../../components/header/header";
import ImageSlide from "../../components/imageSlide";
/*-------------Hooks------------------------------------- */
import timetoday from "../../hooks/Timetoday";
/*-------------Component------------------------------------- */
import { ReactComponent as Meatball } from "../../pictures/menuMeatball.svg";
/*-------------redux------------------------------------- */
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/Slices/userSlice";
/*-------------extra------------------------------------- */
import { PostState } from "../../redux/Slices/postSlice";
import {
  sendFilesPost,
  setFilesOnState,
  setTagsOnState,
} from "../../functions/Formdata";

export default function Post() {
  const [tag, setTag] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [textOverflow, setTextOverflow] = useState<string>();
  const [textShow, setTextShow] = useState<boolean>(false);
  const [submitShow, setSubmitShow] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const nav = useNavigate();
  const user = useAppSelector(selectUser);

  const onBlurHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    let temp = e.target.value;
    setText((text) => temp);
    if (text.length < 100) {
      setTextOverflow(`${temp.slice(0, 100)} ······`);
    }
  };

  const toProfile = () => {
    nav(`/Profile/${user.value.id}`);
  };

  const deleteImgHandler = (file: File, index: number) => {
    const doc = document.getElementById(
      `preview_${index}`
    ) as HTMLDivElement | null;
    if (doc) {
      let temp: File[] = files.filter((data) => {
        if (data !== file) {
          return data;
        }
        return false;
      });
      setFiles((files) => [...temp]);
    }
  };

  let temp: PostState = {
    id: user.value.id,
    name: user.value.name,
    text: text,
    tag: tag,
    date: timetoday(),
    img: null,
    code: null,
  };

  const showSubmit = () => {
    setSubmitShow((submitShow) => !submitShow);
  };

  function PreviewPost() {
    const arr: string[] = [];
    files.map((files) => {
      return arr.push(window.URL.createObjectURL(files));
    });

    return (
      <div className={styles["block-outter"]} style={{ minHeight: "800px" }}>
        <div className={styles["block-inner"]}>
          <ImageSlide
            imgsrc={
              files.length !== 0
                ? arr
                : [
                    "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
                  ]
            }
          />
          <div className={styles["block-statusbox"]}>
            <div className={styles["block-userstatus"]}>
              <img
                src={user.value.img === "null" ? null : user.value.img}
                alt="myprofile"
              />
              <p>{user.value.name}</p>
              <button id="followbtn">Follow</button>
            </div>
            <div className={styles["block-poststatus"]}>
              <div className={styles["block-poststatus-div"]}>
                {timetoday()}
              </div>
              <div className={styles["block-poststatus-meatball"]}>
                <Meatball width="20px" height="20px" />
              </div>
            </div>
            <div
              className={styles["block-textarea"]}
              onClick={() => {
                if (text.length > 100) {
                  setTextShow(!textShow);
                }
              }}
            >
              {text.length < 100 ? text : textShow ? text : textOverflow}
            </div>
            <div className={styles["block-tag"]} style={{ color: "#0984e3" }}>
              {tag.map((text, index) => {
                return `${text} `;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post">
      <Header />
      <div className="post__box">
        {submitShow && (
          <div className="post__yesNo">
            <p>Sure to Submit Post?</p>
            <div>
              <button
                onClick={() => sendFilesPost(temp, files, "post", toProfile)}
              >
                Yes
              </button>
              <button onClick={showSubmit}>No</button>
            </div>
          </div>
        )}
        <form
          className="post__form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/**-----오른쪽 버튼-------*/}
          <div className="post__buttonbox">
            <button
              className="post__buttonbox__button"
              type="button"
              name="img"
              onClick={showSubmit}
            >
              Post
            </button>
            <button
              type="button"
              className="post__buttonbox__button"
              onClick={() => {
                setTag([]);
                setText("");
                setTextOverflow("");
                setTextShow(false);
                setFiles([]);
              }}
            >
              Delete All
            </button>
          </div>
          <div className="post__content">
            {/**-----내용-------*/}
            <h2># 내용</h2>
            <textarea
              id="post-textarea"
              name="post_text"
              autoComplete="off"
              onBlur={(e) => onBlurHandler(e)}
            ></textarea>
            {/**-----태크-------*/}
            <h2># 태그</h2>
            <input
              id="post-tag"
              type="text"
              onBlur={(e) => setTagsOnState(setTag, e)}
              autoComplete="off"
            ></input>
            <p id="tag-example">{"ex) #tag1 #tag2 #tag3"}</p>
            {/**-----이미지-------*/}
            <h2># 이미지</h2>
            <input
              id="post-img"
              type="file"
              accept="img/*"
              multiple
              name="img"
              onChange={(e) => setFilesOnState(e, setFiles)}
            ></input>
            <div className="post__preview">
              {files.map((file, index) => {
                if (index > 6) {
                  return false;
                }
                return (
                  <div id={`preview_${index}`} className="post__imgbox">
                    <button
                      type="button"
                      className="post__imgbox__button"
                      onClick={() => {
                        deleteImgHandler(file, index);
                      }}
                    >
                      X
                    </button>
                    <img
                      id={`img_${index}`}
                      src={window.URL.createObjectURL(file)}
                      className="post__imgbox__img"
                      key={`preview${index}`}
                      alt="img"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <PreviewPost />
          </div>
        </form>
      </div>
    </div>
  );
}
