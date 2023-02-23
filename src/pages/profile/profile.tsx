import "./profile.scss";
import { Header } from "../../components/header/header";
import { Userstates } from "../../redux/Slices/userSlice";
import { PostState } from "../../redux/Slices/postSlice";
import ProfilePost from "../../components/profilePost";
import { useEffect, useState } from "react";
import ProfileMe from "./profileMe";
import { setImagePath } from "../../functions/setImagePath";
import { getInterceptor, sendAxiosState } from "../../functions/APIInterceptor";
import { AxiosResponse } from "axios";
import { useParams } from "react-router";
import LoadingSpinner from "../../components/extra/loadingSpinner";

function Profile() {
  const param = useParams();
  const [inOrderPost, setInOrderPost] = useState<PostState[]>([]);
  const [user, setUser] = useState<Userstates>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    sendRequest();
    userData();
  }, []);

  const sendRequest = () => {
    let data: sendAxiosState = {
      url: `http://localhost:8080/fetchuserpost`,
      data: {
        id: param.id,
      },
      callback: postCallback,
    };
    getInterceptor(data);
  };

  const userData = () => {
    let data: sendAxiosState = {
      url: `http://localhost:8080/getuserdata`,
      data: {
        id: param.id,
      },
      callback: (response: AxiosResponse<any, any>) => {
        setUser((user) => response.data[0]);
        setLoading((loading) => !loading);
      },
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

    setInOrderPost(arr.reverse());
  };

  console.log(inOrderPost);

  return (
    <div className="page-profile">
      <Header />
      {loading ? (
        <div className="block-profile-inner">
          <ProfileMe user={user} />
          <div className="block-profile-right">
            {inOrderPost.map((data, index) => (
              <ProfilePost postState={data} index={index} />
            ))}
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
export default Profile;
