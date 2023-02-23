import "./postMenu.scss";
import { ReactComponent as Option } from "../../pictures/vertical_menu.svg";
import { useState, useEffect } from "react";
import {
  deleteInterceptor,
  sendAxiosState,
} from "../../functions/APIInterceptor";

type Code = {
  code: string;
  id: string;
  func?: () => void;
};

export default function PostMenu({ code, func, id }: Code) {
  const [dropMenu, setDropMenu] = useState<boolean>(false);

  let data: sendAxiosState = {
    url: "/deletepost",
    data: {
      code: code,
      id: id,
    },
  };

  const deletePost = () => {
    deleteInterceptor(data);
    document.getElementById(code).style.display = "none";
  };

  return (
    <div className="profile-post">
      <button
        type="button"
        onClick={() => {
          setDropMenu((dropMenu) => !dropMenu);
        }}
      >
        <Option />
      </button>
      {dropMenu && (
        <div className="profile-post__dropdown">
          <button type="button" onClick={deletePost}>
            Delete
          </button>
          <button type="button" onClick={func}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
