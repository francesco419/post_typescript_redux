import { useEffect, useState } from "react";
import "./ImageSlide.scss";
import { ReactComponent as Heart } from "../pictures/heart.svg";
import { setLikes, selectLikes } from "../redux/likes/likesSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

export default function ImageSlide() {
  const likes = useAppSelector(selectLikes);
  const [image, setImage] = useState<string[]>([
    "https://img.freepik.com/premium-vector/wild-west-flat-illustration_215665-426.jpg?w=2000",
    "https://i.pinimg.com/736x/a7/58/94/a758947f6dcebe6c863eba9580eb15b9.jpg",
    "https://yt3.googleusercontent.com/9fSIeW-tkGl9sfajW9yLWe73bQEHm1kXarHNRpxyJP8o2szvmNPYvR9FXymiyEyjthasbYWL6Bg=s900-c-k-c0x00ffffff-no-rj",
    "https://blog.kakaocdn.net/dn/cSOL0i/btqw6pg4f1h/4LWZ1Whic20CtxwJoOYgDk/img.png",
  ]);
  const [count, setCount] = useState<number>(1);

  const handleClick = (side: string) => {
    const dev: HTMLImageElement = document.getElementById(
      "showimg"
    ) as HTMLImageElement | null;

    if (image) {
      //let index: number = image.indexOf(dev.src);
      let temp: string;
      let arr: string[] = [...image];

      if (side === "right") {
        temp = arr[0];
        arr.shift();
        arr.push(temp);
        setImage((image) => arr);
        if (count >= image.length) {
          setCount((count) => 1);
        } else {
          setCount((count) => count + 1);
        }
      } else if (side === "left") {
        temp = arr[arr.length];
        let popData: string = arr.pop();
        arr.unshift(popData);
        setImage((image) => arr);
        if (count === 1) {
          setCount((count) => 4);
        } else {
          setCount((count) => count - 1);
        }
      }
    }
  };
  return (
    <div className="page-image-box">
      <div className="block-image-img">
        <div className="block-image-count">{`${count}/${image.length}`}</div>
        <img id="showimg" className="img-image" src={image[0]} />
        <div className="block-image-button">
          <button
            className="button-image-side"
            onClick={() => handleClick("left")}
          >
            {"<"}
          </button>
          <button
            className="button-image-side"
            onClick={() => handleClick("right")}
          >
            {">"}
          </button>
        </div>
        <div
          className={likes ? "block-image-svg-true" : "block-image-svg-false"}
        >
          <Heart width="50px" height="50px" fill={likes ? "#ff0000" : "#000"} />
        </div>
      </div>
    </div>
  );
}
