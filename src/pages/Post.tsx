import "./Post.scss";
import styles from "../components/post/PostBox.module.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
/*-------------Component------------------------------------- */
import { Header } from "../components/header/Header";
import ImageSlide from "../components/post/ImageSlide";
/*-------------Hooks------------------------------------- */
import timetoday from "../hooks/Timetoday";
/*-------------Component------------------------------------- */
import { ReactComponent as Likes } from "../pictures/likes.svg";
import { ReactComponent as Meatball } from "../pictures/menuMeatball.svg";
/*-------------redux------------------------------------- */
import { useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/Slices/userSlice";
/*-------------extra------------------------------------- */
import { postInterceptor, sendAxiosState } from "../functions/APIInterceptor";
import { json } from "stream/consumers";

export default function Post() {
  const [tag, setTag] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [textOverflow, setTextOverflow] = useState<string>();
  const [textShow, setTextShow] = useState<boolean>(false);
  const [files, setFiles] = useState<string[]>([]);
  const [testfile, settestfile] = useState<FormData>();
  const [awe, setawe] = useState<File>();
  const nav = useNavigate();

  const user = useAppSelector(selectUser);

  const onChangeTag = () => {
    const doc = document.getElementById("post-tag") as HTMLInputElement | null;
    const text: string = doc.value;
    const arr = text.split(" ");
    let newArr: string[] = [];
    arr.map((tag) => {
      let temp = tag.trim();
      if (tag.charAt(0) === "#") {
        newArr.push(temp);
      }
    });
    setTag((tag) => newArr);
    console.log(tag);
    console.log(["#dks", "dkdkd", "#kk"]);
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    let temp = e.target.value;
    setText((text) => temp);
    if (text.length < 100) {
      setTextOverflow(`${temp.slice(0, 100)} ······`);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fetchFile = e.currentTarget.files;
    if (fetchFile.length >= 7) {
      return;
    }
    if (fetchFile.length <= 1) {
      console.log("1밑");
      setawe(fetchFile[0]);
    }
    //settestfile((testfile) => [...testfile, temp]);
  };

  const postHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (text === "") {
      return false;
    }
    if (user.value.id === "anonymous") {
      return false;
    }

    let formData = new FormData();
    formData.append(`img`, awe, `img$.png`);
    settestfile((testfile) => formData);

    let file: sendAxiosState = {
      url: "http://localhost:8080/upload",
      data: {
        formData,
      },
      config: {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      },
      callback: null,
    };
    postInterceptor(file);

    /* logInCheck();
    nav("/Profile"); */
  };

  const logInCheck = async () => {
    let data: sendAxiosState = {
      url: "http://localhost:8080/post",
      data: {
        user_id: user.value.name,
        text: text,
        date: timetoday(),
        tag: JSON.stringify(tag),
        img: JSON.stringify(files),
      },
      config: null,
      callback: null,
    };

    postInterceptor(data);
  };

  const onClickHandler = (file: string, index: number) => {
    const doc = document.getElementById(
      `preview_${index}`
    ) as HTMLDivElement | null;
    if (doc) {
      let temp: string[] = files.filter((data) => {
        if (data !== file) {
          return data;
        }
        return false;
      });
      setFiles((files) => [...temp]);
    }
  };

  function PreviewPost() {
    return (
      <div className={styles["block-outter"]} style={{ minHeight: "800px" }}>
        <div className={styles["block-inner"]}>
          <ImageSlide
            imgsrc={
              files.length !== 0
                ? files
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
    <div className="page-post">
      <Header />
      <div className="block-post-inner">
        <div className="block-post-container">
          {/**-----오른쪽 버튼-------*/}
          <div className="block-post-absolute">
            <button type="submit" name="img" onClick={(e) => postHandler(e)}>
              Post
            </button>
            <button
              type="button"
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
          <div className="block-post-content">
            {/**-----내용-------*/}
            <h2># 내용</h2>
            <textarea
              id="post-textarea"
              name="post_text"
              autoComplete="off"
              onBlur={(e) => onBlurHandler(e)}
              className="textarea-post-text"
            ></textarea>
            {/**-----태크-------*/}
            <h2># 태그</h2>
            <input
              id="post-tag"
              type="text"
              onBlur={onChangeTag}
              autoComplete="off"
            ></input>
            <p id="tag-example">{"ex) #tag1 #tag2 #tag3"}</p>
            {/**-----이미지-------*/}
            <h2># 이미지</h2>
            <div className="block-post-imgInput">
              <input
                id="post-img"
                type="file"
                accept="img/*"
                multiple
                name="img"
                onChange={onChangeHandler}
              ></input>
              <input
                id="post-imgtext"
                type="text"
                autoComplete="off"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                onBlur={(e) => {
                  if (e.target.value !== "") {
                    setFiles((files) => [...files, e.target.value]);
                    e.target.value = "";
                  }
                }}
              ></input>
            </div>
            <div className="block-post-preview">
              {files.map((file, index) => (
                <div id={`preview_${index}`} className="block-post-img">
                  <button
                    type="button"
                    onClick={() => {
                      onClickHandler(file, index);
                    }}
                  >
                    X
                  </button>
                  <img
                    id={`img_${index}`}
                    src={file}
                    className="img-post"
                    key={`preview${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <PreviewPost />
          </div>
        </div>
      </div>
    </div>
  );
}
