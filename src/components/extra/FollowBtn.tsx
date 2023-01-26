import axios from "axios";
import "../../component.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectUser, setFollow } from "../../redux/Slices/userSlice";

export type followName = {
  followName: string;
};

export default function FollowBtn(props: followName) {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const UpdateFollow = () => {
    /* if (user.id === props.followName) {
      console.log("same user id");
      return;
    } */
    axiosUpdateFollow();
  };
  const axiosUpdateFollow = async () => {
    try {
      const response = await axios.post("http://localhost:8080/update/follow", {
        id: user.id,
        toID: props.followName,
      });
      if (response) {
        const data = response.data[2][0];
        dispatch(setFollow(data.follow));
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <button
      type="button"
      className="component-follow-btn"
      onClick={UpdateFollow}
    >
      Follow
    </button>
  );
}
