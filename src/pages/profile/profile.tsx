import "./profile.scss";
import { Header } from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/Slices/userSlice";
import { PostState, selectPost, setPost } from "../../redux/Slices/postSlice";
import ProfilePost from "../../components/profilePost";
import { useEffect, useState } from "react";
import ProfileMe from "./profileMe";
import { setImagePath } from "../../functions/setImagePath";
import { getInterceptor, sendAxiosState } from "../../functions/APIInterceptor";
import { AxiosResponse } from "axios";

function Profile() {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);
  const user = useAppSelector(selectUser);
  const [inOrderPost, setInOrderPost] = useState<PostState[]>([]);

  useEffect(() => {
    sendRequest();
    changeIndex();
  }, []);

  const sendRequest = () => {
    let data: sendAxiosState = {
      url: `http://localhost:8080/fetch/post`,
      callback: postCallback,
    };
    getInterceptor(data);
  };

  const postCallback = (response: AxiosResponse<any, any>) => {
    let arr: PostState[] = [];

    response.data.forEach((data: any) => {
      let temp: PostState = {
        id: data.id,
        name: data.name,
        text: data.text,
        tag: JSON.parse(data.tag),
        date: data.date,
        img: setImagePath(data.img),
        code: data.code,
      };
      arr.push(temp);
    });

    dispatch(setPost(arr));
  };

  const changeIndex = () => {
    let temp: PostState[] = [];
    post.value.map((data, index) => {
      if (data.name === user.value.name) {
        temp.unshift(data);
      }
    });
    setInOrderPost((inOrderPost) => temp);
  };

  return (
    <div className="page-profile">
      <Header />
      <div className="block-profile-inner">
        <ProfileMe user={user} />
        <div className="block-profile-right">
          {inOrderPost
            .filter(
              (data) => user.value.id === data.id || data.name === "anonymous"
            )
            .map((data, index) => (
              <ProfilePost postState={data} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
}
export default Profile;
