import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import "./Profile.scss";
import { ReactComponent as Icon } from "../pictures/wolf.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { StringLiteral } from "typescript";

function Profile() {
  const [image, setImage] = useState<string[]>([
    "https://img.freepik.com/premium-vector/wild-west-flat-illustration_215665-426.jpg?w=2000",
    "https://i.pinimg.com/736x/a7/58/94/a758947f6dcebe6c863eba9580eb15b9.jpg",
    "https://yt3.googleusercontent.com/9fSIeW-tkGl9sfajW9yLWe73bQEHm1kXarHNRpxyJP8o2szvmNPYvR9FXymiyEyjthasbYWL6Bg=s900-c-k-c0x00ffffff-no-rj",
    "https://blog.kakaocdn.net/dn/cSOL0i/btqw6pg4f1h/4LWZ1Whic20CtxwJoOYgDk/img.png",
    "https://previews.123rf.com/images/gmast3r/gmast3r1605/gmast3r160500005/55962922-%EC%82%B0-%EB%B2%94%EC%9C%84-%EC%97%AC%EB%A6%84-%EA%B0%80%EB%A1%9C-%EA%B0%80%EB%A1%9C-%EB%B0%B0%EB%84%88-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg",
  ]);
  let nav = useNavigate();

  const gotoprofile = () => {
    nav(`/profile`);
  };

  type ProfileProps = {
    data: string;
  };
  type PostProps = {
    subid: number;
  };

  const ProfileImage = (data: ProfileProps) => {
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

  function ProfilePost(subid: PostProps) {
    const id_id: string = `overflow${subid.subid}`;
    const id_hid: string = `hid${subid.subid}`;
    const handleimageClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      //console.log(e.currentTarget.value);

      let img = new Image();
      let temp: number;
      let fixedHeight: number;
      let cnt: number = 1;

      if (e.currentTarget.value) {
        const src: string = e.currentTarget.value;
        const exist: string = (
          document.getElementById(id_hid) as HTMLImageElement
        ).src;
        const overflow = document.getElementById(id_id);

        if (exist === e.currentTarget.value) {
          if (overflow && exist) {
            img.src = exist;

            if (img.height <= 500) {
              temp = img.height;
              fixedHeight = img.height;
            } else {
              fixedHeight = 500;
              temp = 500;
            }

            setInterval(
              () => {
                if (101 !== cnt) {
                  console.log(`${fixedHeight - (fixedHeight / 100) * cnt}px`);
                  overflow.style.maxHeight = `${
                    fixedHeight - (fixedHeight / 100) * cnt
                  }px`;
                  cnt++;
                  temp -= fixedHeight / 100;
                }
              },
              cnt === 101 ? null : 3
            );
          }
          setTimeout(() => {
            (document.getElementById(id_hid) as HTMLImageElement).src =
              "http://localhost:3000/profile";
            overflow.style.display = "none";
            overflow.style.maxHeight = `580px`;
          }, 500);
        } else {
          if (exist !== "http://localhost:3000/profile") {
            (document.getElementById(id_hid) as HTMLImageElement).src = src;
          } else if (exist === "http://localhost:3000/profile") {
            (document.getElementById(id_hid) as HTMLImageElement).src = src;
            if (overflow && src) {
              overflow.style.maxHeight = "0px";
              overflow.style.display = "block";
              console.log("overflow && src");
              img.src = src;

              if (img.height <= 500) {
                temp = img.height + 80;
                fixedHeight = img.height / 100;
              } else {
                fixedHeight = 5;
                temp = 500 + 80;
              }
              let limit: number = temp / fixedHeight;

              console.log(limit, cnt);
              const timer = setInterval(
                () => {
                  if (cnt < limit) {
                    console.log(`limit:${limit}, cnt:${cnt}`);
                    console.log(`${fixedHeight * cnt}px`);
                    overflow.style.maxHeight = `${fixedHeight * cnt}px`;
                    cnt++;
                  } else {
                    clearInterval(timer);
                  }
                },
                cnt < limit ? null : 3
              );
            }
          }
        }
      }
    };

    const handlehideClick = () => {
      let img = new Image();
      let temp: number;
      let fixedHeight: number;
      let cnt: number = 1;
      const overflow = document.getElementById("overflow") as HTMLDivElement;
      const src = (document.getElementById("hid") as HTMLImageElement).src;
      if (overflow && src) {
        img.src = src;
        if (img.height <= 500) {
          temp = img.height;
          fixedHeight = img.height;
        } else {
          fixedHeight = 500;
          temp = 500;
        }
        setInterval(
          () => {
            if (101 !== cnt) {
              console.log(`${fixedHeight - (fixedHeight / 100) * cnt}px`);
              overflow.style.maxHeight = `${
                fixedHeight - (fixedHeight / 100) * cnt
              }px`;
              cnt++;
              temp -= fixedHeight / 100;
            }
          },
          cnt === 101 ? null : 3
        );
      }
      setTimeout(() => {
        (document.getElementById("hid") as HTMLImageElement).src =
          "http://localhost:3000/profile";
        overflow.style.display = "none";
        overflow.style.maxHeight = `580px`;
      }, 500);
    };
    return (
      <div className="block-profile-postbox">
        <div className="block-profile-top">
          <div className="block-profile-3">
            <ProfileImage data={"block-profile-postimg"} />
            <strong>frank</strong>
          </div>
          <div className="block-profile-detail">
            <p>천둥이가 너무 깝친다 ㅠㅠ 맛난거 줄게 좀...</p>
          </div>
          <div className="block-profile-tag">
            <p>#tag #tag #tag #tag</p>
          </div>
        </div>
        <div className="block-profile-imagebox">
          <div className="block-profile-onlyload">
            {image.map((data, index) => (
              <button value={data} onClick={(e) => handleimageClick(e)}>
                <img
                  id={index.toString()}
                  className="block-profile-image"
                  src={data}
                />
              </button>
            ))}
          </div>
          <div id={id_id} className="block-profile-hidden">
            <div id="hidden" className="block-profile-overflow">
              <button className="btn-profile-hidden" onClick={handlehideClick}>
                X
              </button>
              <img id={id_hid} className="img-profile-hidden" src=""></img>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ProfileMe() {
    return (
      <div id="1.1" className="block-profile-left">
        <div className="block-profile-0">
          <ProfileImage data={"block-profile-photo"} />
          <div id="2" className="block-profile-name">
            <div className="block-profile-id">
              <p>francesco_419</p>
              <div className="block-profile-int">
                <p>Introduce my self...</p>
              </div>
            </div>
            <div>
              <button type="button" className="btn-profile-follow">
                Follow
              </button>
            </div>
          </div>
        </div>
        <div className="block-profile-1">
          <div>
            <button className="btn-profile-post">POST</button>
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
            <ProfilePost subid={0} />
            <ProfilePost subid={1} />
            <ProfilePost subid={2} />
            <ProfilePost subid={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
