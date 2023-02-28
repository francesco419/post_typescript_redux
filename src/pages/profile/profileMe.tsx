import { selectUser, Userstates } from "../../redux/Slices/userSlice";
import { useNavigate } from "react-router";
import { setImagePath } from "../../functions/setImagePath";
import { useEffect, useState } from "react";
import { putInterceptor, sendAxiosState } from "../../functions/APIInterceptor";
import { AxiosResponse } from "axios";
import { useAppSelector } from "../../redux/hooks";
import Button from "../../components/Button";

type ProfileMes = {
  user: Userstates;
};

export default function ProfileMe({ user }: ProfileMes) {
  const [img, setImg] = useState<string>("");
  const nav = useNavigate();

  useEffect(() => {
    let image = setImagePath(user.img);
    setImg((img) => image[0]);
  }, []);

  return (
    <div id="1.1" className="block-profile-left">
      <div className="block-profile-0">
        <div className="block-profile-photo" onClick={() => nav(`/profile`)}>
          <img src={img} alt="profile_Img" />
        </div>
        <div id="2" className="block-profile-name">
          <div className="block-profile-id">
            <h1>{user.name}</h1>
            <p>{user.info}</p>
          </div>
          <FollowButton target={user.id} />
        </div>
      </div>
      <div className="block-profile-1">
        <div>
          <h3>Posts</h3>
          <p>{user.post}</p>
        </div>
        <div>
          <h3>Follow</h3>
          <p>{user.follow}</p>
        </div>
        <div>
          <h3>Follower</h3>
          <p>{user.follower}</p>
        </div>
      </div>
      <div className="block-profile-2">
        <Button
          children="POST"
          act={() => {
            if (user.id === "anonymous") {
              return;
            }
            nav("/Post");
          }}
          size="lg"
        />
      </div>
    </div>
  );
}

interface follow {
  id?: string;
  target?: string;
}

function FollowButton({ target }: follow) {
  const [bool, setBool] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  let timer: NodeJS.Timeout;

  const debounce = () => {
    if (timer) {
      clearTimeout(timer);
    }
    if (!bool) {
      timer = setTimeout(() => {
        console.log(2);
        putInterceptor(data);
      }, 1000);
    } else {
      timer = setTimeout(() => {
        console.log(2);
        putInterceptor(data);
      }, 1000);
    }
  };

  let data: sendAxiosState = {
    url: `http://localhost:8080/changefollow`,
    data: {
      target: target,
      myid: user.value.id,
      do: bool,
    },
    config: null,
    callback: (response: AxiosResponse) => {
      console.log(response);
    },
  };

  if (user.value.id !== target) {
    return (
      <button
        className="profile-me__followBtn"
        style={{ backgroundColor: bool ? "#fff000" : "#fff" }}
        onClick={() => {
          setBool((bool) => !bool);
          debounce();
        }}
      >
        {bool ? "followed" : "follow"}
      </button>
    );
  }
}
