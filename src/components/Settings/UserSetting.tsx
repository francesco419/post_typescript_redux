import "./UserSetting.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectUser } from "../../redux/Slices/userSlice";
import {
  selectShow,
  ShowUserEdit,
  setInitial,
} from "../../redux/Slices/showSlice";
import { ReactComponent as Edit } from "../../pictures/edit.svg";
import { UserEdit } from "./UserEdit";
import { useEffect, useState } from "react";

export function UserSetting() {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectShow);
  const user = useAppSelector(selectUser);
  const temp: string[] = [
    `Name : ${user.name}`,
    "Password",
    `Birth : ${user.birth}`,
    `Email : ${user.email}`,
  ];

  useEffect(() => {
    dispatch(setInitial());
  }, []);

  const handleClick = () => {
    const upload = document.getElementById("upload") as HTMLDivElement;
    upload.style.display = "block";
  };

  const handleUserEdit = () => {
    dispatch(ShowUserEdit());
  };

  return (
    <div className="block-usersettings-display">
      {show.userEdit && <UserEdit />}
      <div className="block-usersettings-0">
        <img src={user.img} alt="Profile" />
        <button type="button" onClick={handleClick}>
          Image
        </button>
      </div>
      <div className="block-usersettings-1">
        {temp.map((data) => (
          <div>
            <p>{data}</p>
            <Edit onClick={handleUserEdit} />
          </div>
        ))}
      </div>
      <div className="block-usersettings-2">
        <div>
          <p>Posts</p>
          <p>{user.post}</p>
        </div>
        <div>
          <p>Follow</p>
          <p>{user.follow}</p>
        </div>
        <div>
          <p>Follower</p>
          <p>{user.follower}</p>
        </div>
      </div>
      <div className="block-usersettings-3">
        <div className="block-usersettings-intro">
          <div className="block-usersettings-box">
            <p>Intro</p>
            <Edit onClick={handleUserEdit} />
          </div>
          <div>
            <p>{user.info}</p>
          </div>
        </div>
      </div>
      <div className="block-usersettings-4">
        <button>Save</button>
      </div>
    </div>
  );
}
