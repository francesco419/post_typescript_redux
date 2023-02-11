import { Userstate } from "../../redux/Slices/userSlice";
import { useNavigate } from "react-router";
import { ProfileImage } from "../../components/profileImage";

type ProfileMe = {
  user: Userstate;
};

export default function ProfileMe({ user }: ProfileMe) {
  const nav = useNavigate();
  return (
    <div id="1.1" className="block-profile-left">
      <div className="block-profile-0">
        <div className="block-profile-photo" onClick={() => nav(`/profile`)}>
          <img src={user.value.img} />
        </div>
        <div id="2" className="block-profile-name">
          <div className="block-profile-id">
            <h1>{user.value.name}</h1>
            <p>{user.value.info}</p>
          </div>
        </div>
      </div>
      <div className="block-profile-1">
        <div>
          <h3>Posts</h3>
          <p>{user.value.post}</p>
        </div>
        <div>
          <h3>Follow</h3>
          <p>{user.value.follow}</p>
        </div>
        <div>
          <h3>Follower</h3>
          <p>{user.value.follower}</p>
        </div>
      </div>
      <div className="block-profile-2">
        <button
          onClick={() => {
            if (user.value.id === "anonymous") {
              return;
            }
            nav("/Post");
          }}
        >
          POST
        </button>
      </div>
    </div>
  );
}
