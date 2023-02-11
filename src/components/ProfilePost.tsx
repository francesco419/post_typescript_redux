import "./profilePost.scss";
import { ProfileImage } from "./profileImage";
import { PostState } from "../redux/Slices/postSlice";
import { Link } from "react-router-dom";
import { selectUser } from "../redux/Slices/userSlice";
import { useAppSelector } from "../redux/hooks";

type PostChild = {
  PostState: PostState;
  index: number;
};

export default function ProfilePost(postState: PostChild, index: number) {
  const id_id: string = `overflow${postState.index}`;
  const id_hid: string = `hid${postState.index}`;
  const user = useAppSelector(selectUser);
  const post_data = postState.PostState;

  const handleimageClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const src: string = e.currentTarget.value;
    const exist: HTMLImageElement = document.getElementById(
      id_hid
    ) as HTMLImageElement | null;
    const overflow = document.getElementById(id_id);

    let count: number;

    if (exist.src === "http://localhost:3000/profile") {
      //localhost는 공백 src를 대신하기 위함. src=" " 는 윗 주소 자동설정됨.
      console.log(2);
      //숨겨진 img의 src가 null일때
      exist.src = src; // 숨겨진 img에 이미지 할당

      overflow.style.display = "block"; // 숨겨진 img 보여주기
      overflow.style.height = "0px"; // 숨겨진 img 높이 0 셋팅

      count = 0;
      const timer = setInterval(() => {
        if (count !== 100) {
          overflow.style.height = `${5 * count}px`;
        } else {
          clearInterval(timer);
        }
        count++;
      }, 3);

      return;
    }
    if (exist.src !== src) {
      exist.src = src;
      return;
    }
    if (exist.src === src) {
      count = 100;
      const timer = setInterval(() => {
        if (count !== 0) {
          overflow.style.height = `${5 * count}px`;
        } else {
          overflow.style.height = `0px`;
          overflow.style.display = "none";
          clearInterval(timer);
          exist.src = "";
          console.log(exist.src);
        }
        count--;
      }, 3);

      return;
    }
  };

  return (
    <div className="block-profile-postbox">
      <div className="block-profile-top">
        <div className="block-profile-3">
          <ProfileImage data={user.value.img} />
          <div>
            <strong>{post_data.name}</strong>
            <p>{post_data.date}</p>
          </div>
        </div>
        <div className="block-profile-detail">
          <p>{post_data.text}</p>
        </div>
        <div className="block-profile-tag">
          {post_data.tag.map((tag, index) => (
            <Link
              to={`/Search/${tag.substring(1)}`}
              key={`${tag.substring(1)}${index}`}
            >
              {`${tag}`}
            </Link>
          ))}
        </div>
      </div>
      <div className="block-profile-imagebox">
        <div className="block-profile-onlyload">
          {post_data.img.map((data, index) => (
            <button
              value={data}
              onClick={(e) => handleimageClick(e)}
              key={`postImg${index}`}
            >
              <img id={index.toString()} src={data} alt="post" />
            </button>
          ))}
        </div>
        <div id={id_id} className="block-profile-hidden">
          <div id="hidden" className="block-profile-overflow">
            <img
              id={id_hid}
              src={"http://localhost:3000/profile"}
              alt="hidden"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
