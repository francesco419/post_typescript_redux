import { useState, useEffect } from "react";
import "./imageSlide.scss";
import { ReactComponent as Heart } from "../pictures/heart.svg";
import { selectLikes } from "../redux/Slices/likesSlice";
import { useAppSelector } from "../redux/hooks";
import no_image from "../pictures/image_not_found.jpg";

interface SlideProps {
  imgsrc: string[];
}

export default function ImageSlide(array: SlideProps) {
  const likes = useAppSelector(selectLikes);
  const [image, setImage] = useState<string[]>(
    [...array.imgsrc, no_image] || null
  );
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setImage([...array.imgsrc, no_image] || null);
    setCount(0);
  }, [array]);

  const handleClick = (side: string) => {
    //const dev: HTMLImageElement = document.getElementById("showimg") as HTMLImageElement | null;
    if (image.length !== 0) {
      //let index: number = image.indexOf(dev.src);
      let temp: string;
      let arr: string[] = [...image];

      if (side === "right") {
        if (count + 1 >= image.length) {
          setCount((count) => 0);
        } else {
          setCount((count) => count + 1);
        }
      } else if (side === "left") {
        if (count === 0) {
          setCount((count) => array.imgsrc.length);
        } else {
          setCount((count) => count - 1);
        }
      }
    }
    console.log(count);
  };
  //console.log(JSON.parse(array.imgsrc[0]));
  return (
    <div className="page-image-box">
      <div className="block-image-img">
        <div className="block-image-count">{`${
          array.imgsrc.length < 1 ? 0 : count + 1
        }/${image.length}`}</div>
        <img
          id="showimg"
          className="img-image"
          src={image[count]}
          alt="post-img"
        />
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
