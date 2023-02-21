import "./postComment.scss";
import { useRef, useEffect, useState } from "react";
import {
  postInterceptor,
  sendAxiosState,
  getInterceptor,
} from "../functions/APIInterceptor";
import { AxiosResponse } from "axios";

type Name = {
  name: string;
  code?: string;
  index: number;
};

interface CommentType {
  code: string;
  comment: string[];
}

export default function PostComment({ name, code, index }: Name) {
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
    console.log("comment");
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
        setComment((comment) => JSON.parse(response.data[0].comment));
      },
    };
    getInterceptor(initialData);
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
          type="submit"
          onClick={submitComment}
        >
          submit
        </button>
      </div>
      {comment.map((data, index) => {
        return (
          <div className="comment-read" key={`${code}__${index}`}>
            <p className="comment-read__name">{data[0]}</p>
            <p className="comment-read__comment">{data[1]}</p>
          </div>
        );
      })}
      <div className="comment-read">
        <p className="comment-read__name">TempName</p>
        <p className="comment-read__comment">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took
        </p>
      </div>
    </div>
  );
}
