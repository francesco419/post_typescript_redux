import { Userstate } from "../redux/Slices/userSlice";
import { useNavigate } from "react-router";
import { ProfileImage } from "../pages/Profile";

type ProfileMe = {
  user: Userstate;
};

export default function ProfileMe({ user }: ProfileMe) {
  const nav = useNavigate();
  return (
    <div id="1.1" className="block-profile-left">
      <div className="block-profile-0">
        <ProfileImage data={"block-profile-photo"} />
        <div id="2" className="block-profile-name">
          <div className="block-profile-id">
            <p>{user.value.name}</p>
            <div className="block-profile-int">
              <p>{user.value.info}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="block-profile-1">
        <div>
          <p>Posts</p>
          <p>{user.value.post}</p>
        </div>
        <div>
          <p>Follow</p>
          <p>{user.value.follow}</p>
        </div>
        <div>
          <p>Follower</p>
          <p>{user.value.follower}</p>
        </div>
      </div>
      <div className="block-profile-2">
        <div>
          <button
            className="btn-profile-post"
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
    </div>
  );
}
