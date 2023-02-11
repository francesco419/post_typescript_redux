import { useNavigate } from "react-router";
import "./profileImage.scss";

export type ProfileProps = {
  data: string;
};

export const ProfileImage = (data: ProfileProps) => {
  let nav = useNavigate();
  const gotoprofile = () => {
    nav(`/profile`);
  };
  console.log(data);
  return (
    <div className="block-profileimg" onClick={gotoprofile}>
      <img src={data.data} />
    </div>
  );
};
