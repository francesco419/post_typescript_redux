import "./profilePost.scss";
import { ProfileImage } from "./profileImage";
import { PostState } from "../redux/Slices/postSlice";
import { Link } from "react-router-dom";
import { selectUser } from "../redux/Slices/userSlice";
import { useAppSelector } from "../redux/hooks";
import React, { useState } from "react";
import EditPost from "../pages/post/EditPost";
import PostMenu from "../pages/post/postMenu";
import CommentCount from "./profileCommentCount";
import PostImageControl from "./postImageBox";

export interface PostChild {
  postState: PostState;
  index?: number;
}

export default function ProfilePost({ postState, index }: PostChild) {
  const [editShow, setEditShow] = useState<boolean>(false);
  const [textShow, setTextShow] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const post_data = postState;

  const onChangeEditShow = () => {
    setEditShow((editShow) => !editShow);
  };

  const textlengthShow = (text: string) => {
    if (text.length > 100) {
      return (
        <pre>
          {textShow ? text : text.slice(0, 99) + "..."}
          <button className="profilepost__textBtn" onClick={setStateTextShow}>
            {textShow ? "short" : "more"}
          </button>
        </pre>
      );
    } else {
      return <pre>{text}</pre>;
    }
  };

  function setStateTextShow() {
    setTextShow((textShow) => !textShow);
  }

  return (
    <div id={`${post_data.code}`} className="block-profile-postbox">
      <div className="block-profile-top">
        <div className="block-profile-3">
          <ProfileImage data={user.value.img} id={postState.id} />
          <div>
            <strong>{post_data.name}</strong>
            <p>{post_data.date}</p>
          </div>
          {post_data.announcement ? (
            <p style={{ margin: "0 0 0 20px", color: "red" }}>*공지사항</p>
          ) : null}
          {user.value.id === post_data.id && (
            <PostMenu
              code={post_data.code}
              func={onChangeEditShow}
              id={post_data.id}
            />
          )}
        </div>
        <div className="block-profile-detail">
          {textlengthShow(post_data.text)}
        </div>
        <div className="block-profile-tag">
          {post_data.tag.map((tag, index) => (
            <Link
              to={`/Search/${tag.substring(1)}`}
              key={`${tag.substring(1)}${index}`}
            >
              {`${tag}`}
            </Link>
          ))}
        </div>
      </div>
      <div className="block-profile-imagebox">
        <PostImageControl postState={post_data} />
      </div>
      <CommentCount postState={post_data} />
      {editShow && <EditPost props={post_data} func={onChangeEditShow} />}
    </div>
  );
}
