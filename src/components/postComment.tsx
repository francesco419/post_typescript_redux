import "./postComment.scss";
import { useRef, useEffect, useState } from "react";
import {
  postInterceptor,
  sendAxiosState,
  getInterceptor,
  putInterceptor,
} from "../functions/APIInterceptor";
import { AxiosResponse } from "axios";

type Name = {
  name: string;
  code?: string;
  countSum: (bool: boolean) => void;
};

interface CommentType {
  code: string;
  comment: string[];
}

export default function PostComment({ name, code, countSum }: Name) {
  const [comment, setComment] = useState<any[]>([]);
  const [forceRender, setForceRender] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>();
  let COMMENTTEXT: string;

  useEffect(() => {
    getCommentData();
  }, []);

  useEffect(() => {
    getCommentData();
  }, [forceRender]);

  const autoHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    COMMENTTEXT = e.target.value;
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  const submitComment = () => {
    if (COMMENTTEXT === undefined) {
      return;
    }

    let data: CommentType = {
      code: code,
      comment: [name, COMMENTTEXT],
    };

    let file: sendAxiosState = {
      url: `http://localhost:8080/comment`,
      data: data,
      config: null,
      callback: (response: AxiosResponse) => {
        textAreaRef.current.value = "";
        COMMENTTEXT = "";
        setForceRender((forceRender) => !forceRender);
        countSum(false);
      },
    };

    postInterceptor(file);
  };

  const getCommentData = () => {
    let initialData: sendAxiosState = {
      url: `http://localhost:8080/fetchComment`,
      data: {
        code: code,
      },
      callback: (response: AxiosResponse) => {
        if (response.data[0].comment) {
          setComment((comment) => JSON.parse(response.data[0].comment));
        }
      },
    };
    getInterceptor(initialData);
  };

  const deleteComment = (index: number) => {
    let newComment = [...comment];
    newComment.splice(index, 1);
    console.log(newComment);
    let file: sendAxiosState = {
      url: `http://localhost:8080/deletecomment`,
      data: {
        comment: newComment,
        code: code,
      },
      config: null,
      callback: (response: AxiosResponse) => {
        setForceRender((forceRender) => !forceRender);
        countSum(true);
      },
    };

    putInterceptor(file);
  };

  return (
    <div className="post-comment">
      <div className="comment-write">
        <p className="comment-write__name">{name}</p>
        <textarea
          ref={textAreaRef}
          rows={1}
          className="comment-write__input"
          placeholder="댓글입력"
          onChange={(e) => autoHeight(e)}
        />
        <button
          className="comment-write__button"
          type="button"
          onClick={submitComment}
        >
          submit
        </button>
      </div>
      <hr />
      {comment.map((data, index) => {
        return (
          <div className="comment-container" key={`${code}__${index}`}>
            <div className="comment-read">
              <p className="comment-read__name">{data[0]}</p>
              <pre className="comment-read__comment">{data[1]}</pre>
            </div>
            {name === data[0] ? (
              <button
                type="button"
                className="comment-container__deletebtn"
                onClick={() => {
                  if (name === data[0]) {
                    deleteComment(index);
                  }
                }}
              >
                X
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
