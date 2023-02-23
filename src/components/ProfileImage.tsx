import { useNavigate } from "react-router";
import "./profileImage.scss";

export type ProfileProps = {
  data: string;
  id?: string;
};

export const ProfileImage = ({ data, id }: ProfileProps) => {
  let nav = useNavigate();
  const gotoprofile = () => {
    nav(`/profile/${id}`);
  };
  return (
    <div className="block-profileimg" onClick={gotoprofile}>
      <img src={data} />
    </div>
  );
};
