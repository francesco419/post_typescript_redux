import { useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/Slices/userSlice";
import { PostChild } from "./profilePost";
import React, { useState } from "react";
import PostComment from "./postComment";
import "./profilePost.scss";

export default function CommentCount({ postState }: PostChild) {
  const user = useAppSelector(selectUser);
  const [commentCountSum, setCommentCountSum] = useState(0);
  const [commentShow, setCommentShow] = useState<boolean>(false);

  const onChangeCommentShow = () => {
    setCommentShow((commentShow) => !commentShow);
  };

  const sumCount = (bool: boolean) => {
    if (bool) {
      setCommentCountSum((commentCountSum) => commentCountSum + 1);
    } else {
      setCommentCountSum((commentCountSum) => commentCountSum - 1);
    }
  };

  return (
    <div className="block-profile-comment">
      <p className="block-profile-comment__click" onClick={onChangeCommentShow}>
        {postState.commentCount > 0
          ? postState.commentCount - commentCountSum
          : 0}{" "}
        개의 댓글
      </p>
      {commentShow && (
        <PostComment
          name={user.value.name}
          code={postState.code}
          countSum={sumCount}
        />
      )}
    </div>
  );
}
