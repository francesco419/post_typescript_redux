import "./Profile.scss";
import { Header } from "../components/header/Header";
import { ReactComponent as Icon } from "../pictures/wolf.svg";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectUser, Userstate } from "../redux/Slices/userSlice";
import { PostState, selectPost } from "../redux/Slices/postSlice";
import ProfilePost from "../components/ProfilePost";
import { useEffect, useState } from "react";
import ProfileMe from "../components/profile/ProfileMe";

function Profile() {
  const post = useAppSelector(selectPost);
  const user = useAppSelector(selectUser);
  const [inOrderPost, setInOrderPost] = useState<PostState[]>([]);

  const changeIndex = () => {
    let temp: PostState[] = [...post.value];
    post.value.map((data, index) => {
      if (data.name === user.value.name) {
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
              <ProfilePost PostState={data} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
}
export default Profile;
