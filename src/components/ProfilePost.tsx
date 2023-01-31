import "./ProfilePost.scss";
import { ProfileImage } from "../pages/Profile";
import { PostState } from "../redux/Slices/postSlice";
import { Link } from "react-router-dom";

type PostChild = {
  PostState: PostState;
  index: number;
};

export default function ProfilePost(postState: PostChild, index: number) {
  /* const image: string[] = [
    "https://img.freepik.com/premium-vector/wild-west-flat-illustration_215665-426.jpg?w=2000",
    "https://i.pinimg.com/736x/a7/58/94/a758947f6dcebe6c863eba9580eb15b9.jpg",
    "https://yt3.googleusercontent.com/9fSIeW-tkGl9sfajW9yLWe73bQEHm1kXarHNRpxyJP8o2szvmNPYvR9FXymiyEyjthasbYWL6Bg=s900-c-k-c0x00ffffff-no-rj",
    "https://blog.kakaocdn.net/dn/cSOL0i/btqw6pg4f1h/4LWZ1Whic20CtxwJoOYgDk/img.png",
    "https://previews.123rf.com/images/gmast3r/gmast3r1605/gmast3r160500005/55962922-%EC%82%B0-%EB%B2%94%EC%9C%84-%EC%97%AC%EB%A6%84-%EA%B0%80%EB%A1%9C-%EA%B0%80%EB%A1%9C-%EB%B0%B0%EB%84%88-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg",
  ]; */
  const id_id: string = `overflow${postState.index}`;
  const id_hid: string = `hid${postState.index}`;
  const post_data = postState.PostState;

  const handleimageClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const src: string = e.currentTarget.value;
    const exist: HTMLImageElement = document.getElementById(
      id_hid
    ) as HTMLImageElement | null;
    const overflow = document.getElementById(id_id);

    let img = new Image();
    let fixedHeight: number;
    let a: number;

    if (exist.src !== src) {
      //숨겨진 img의 src가 null일때
      img.src = src; //image 객체에 클릭 이미지 할당
      exist.src = src; // 숨겨진 img에 이미지 할당

      overflow.style.display = "block"; // 숨겨진 img 보여주기
      overflow.style.height = "0px"; // 숨겨진 img 높이 0 셋팅

      img.height > 550 ? (fixedHeight = 550) : (fixedHeight = img.height); //최대높이 600 설정.

      a = 100;
      const timer = setInterval(() => {
        if (a !== 0) {
          overflow.style.height = `${fixedHeight - (fixedHeight / 100) * a}px`;
        } else {
          clearInterval(timer);
        }
        a--;
      }, 3);

      return;
    }
    if (exist.src === src) {
      img.src = src;
      img.height > 550 ? (fixedHeight = 550) : (fixedHeight = img.height);

      a = 0;
      const timer = setInterval(() => {
        if (a !== 100) {
          overflow.style.height = `${fixedHeight - (fixedHeight / 100) * a}px`;
        } else {
          clearInterval(timer);
          exist.src =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm0wn1zg4zsGH4UQip7UGTQPfVT_VpxBf_lg&usqp=CAU";
        }
        a++;
      }, 3);

      return;
    }
  };

  return (
    <div className="block-profile-postbox">
      <div className="block-profile-top">
        <div className="block-profile-3">
          <ProfileImage data={"block-profile-postimg"} />
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
              <img
                id={index.toString()}
                className="block-profile-image"
                src={data}
                alt="post"
              />
            </button>
          ))}
        </div>
        <div id={id_id} className="block-profile-hidden">
          <div id="hidden" className="block-profile-overflow">
            <img
              id={id_hid}
              src={null}
              className="img-profile-hidden"
              alt="hidden"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
