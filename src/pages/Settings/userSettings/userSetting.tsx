import "./userSetting.scss";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectUser2 } from "../../../redux/Slices/userSlice";
import {
  selectShow,
  ShowUserEdit,
  setInitial,
} from "../../../redux/Slices/showSlice";
import { ReactComponent as Edit } from "../../../pictures/edit.svg";
import { UserEdit } from "./userEdit";
import { useEffect, useState } from "react";
import { setImagePath } from "../../../functions/setImagePath";
import { setImg } from "../../../redux/Slices/userSlice";
import { sendAxiosState } from "../../../functions/APIInterceptor";
import { getInterceptor } from "../../../functions/APIInterceptor";
import { AxiosResponse } from "axios";

export function UserSetting() {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectShow);
  const user = useAppSelector(selectUser2);
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

  const postcallback = (response: AxiosResponse<any, any>) => {
    console.log(response.data[0]);
    dispatch(setInitial(response.data[0]));
    let temp = setImagePath(response.data[0].img);
    dispatch(setImg(temp[0]));
  };

  const refreshUserData = async () => {
    let data: sendAxiosState = {
      url: "http://localhost:8080/getuserdata",
      data: {
        id: user.id,
      },
      callback: postcallback,
    };
    getInterceptor(data);
  };

  //const text = user.info.replaceAll("<br/>", "\r\n");
  //console.log(text);

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
        {temp.map((data, index) => (
          <p key={index}>{data}</p>
        ))}
        <Edit onClick={handleUserEdit} />
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
          <p>{user.info}</p>
        </div>
      </div>
      <div className="block-usersettings-4">
        <button onClick={refreshUserData}>Refresh</button>
      </div>
    </div>
  );
}
