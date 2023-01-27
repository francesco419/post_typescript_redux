import "./Profile.scss";
import { Header } from "../components/Header";
import { ReactComponent as Icon } from "../pictures/wolf.svg";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectUser, Userstate } from "../redux/Slices/userSlice";
import { PostState, selectPost } from "../redux/Slices/postSlice";
import ProfilePost from "../components/ProfilePost";
import { useEffect, useState } from "react";

export type ProfileProps = {
  data: string;
};

export const ProfileImage = (data: ProfileProps) => {
  let nav = useNavigate();
  const gotoprofile = () => {
    nav(`/profile`);
  };
  return (
    <div
      className={data.data}
      onClick={gotoprofile}
      style={{ cursor: "pointer" }}
    >
      <Icon />
    </div>
  );
};

function Profile() {
  const post = useAppSelector(selectPost);
  const user = useAppSelector(selectUser);
  const nav = useNavigate();
  const [inOrderPost, setInOrderPost] = useState<PostState[]>([]);

  const changeIndex = () => {
    let temp: PostState[] = [...post.value];
    post.value.map((data, index) => {
      if (data.user_id === user.name) {
        temp.splice(index, 1);
        temp.unshift(data);
      }
    });
    setInOrderPost((inOrderPost) => temp);
  };

  useEffect(() => {
    changeIndex();
    return () => {
      changeIndex();
    };
  }, []);

  function ProfileMe() {
    return (
      <div id="1.1" className="block-profile-left">
        <div className="block-profile-0">
          <ProfileImage data={"block-profile-photo"} />
          <div id="2" className="block-profile-name">
            <div className="block-profile-id">
              <p>{user.name}</p>
              <div className="block-profile-int">
                <p>{user.info}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="block-profile-1">
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
        <div className="block-profile-2">
          <div>
            <button
              className="btn-profile-post"
              onClick={() => {
                if (user.id === "anonymous") {
                  return;
                }
                nav("/Post");
              }}
            >
              POST
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-profile">
      <Header />
      <div className="block-profile-inner">
        <ProfileMe />
        <div className="block-profile-right">
          <div className="block-profile-post">
            {inOrderPost
              .filter((data) => user.id === data.user_id || "anonymous")
              .map((data, index) => (
                <ProfilePost PostState={data} index={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
