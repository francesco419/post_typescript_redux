import { PostChild } from "./profilePost";
import "./postImageBox.scss";
import { useState } from "react";

export default function PostImageControl({ postState }: PostChild) {
  const [fullImageShow, setFullImageShow] = useState(false);
  const [fullImage, setFullImage] = useState("");
  const length = postState.img.length;
  const IMAGE_COUNT = {
    divide_height: length > 2 ? 2 : 1,
    divide_width: length > 2 ? Math.round(length / 2) : 2,
  };

  const changeImage = (ImageURL: string) => {
    console.log(1);
    setFullImage((fullImage) => ImageURL);
    setFullImageShow((fullImageShow) => !fullImageShow);
  };

  function FullImageComp() {
    return (
      <div className="pic-absolute">
        <img
          src={fullImage}
          alt="fullimage"
          onClick={() => setFullImageShow((fullImageShow) => !fullImageShow)}
        />
        <p className="pic-absolute__quit">Click Image to Quit</p>
      </div>
    );
  }

  if (postState.img.length === 0) {
    return;
  }
  if (postState.img.length === 1) {
    return (
      <div className="pic-onlyone">
        {fullImageShow && <FullImageComp />}
        {postState.img.map((data, index) => (
          <img
            id={index.toString()}
            src={data}
            alt="post"
            key={`postImg${index}`}
            onClick={() => changeImage(data)}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="pic-morethantwo">
        {fullImageShow && <FullImageComp />}
        {postState.img.map((data, index) => (
          <img
            style={{
              width: `${100 / IMAGE_COUNT.divide_width}%`,
              height: `${100 / IMAGE_COUNT.divide_height}%`,
            }}
            id={index.toString()}
            src={data}
            key={`postImg${index}`}
            alt="post"
            onClick={() => changeImage(data)}
          />
        ))}
        {length % 2 !== 0 && (
          <div
            style={{
              width: `${100 / IMAGE_COUNT.divide_width}%`,
              height: `${100 / IMAGE_COUNT.divide_height}%`,
              backgroundColor: "#000",
            }}
          ></div>
        )}
      </div>
    );
  }
}
