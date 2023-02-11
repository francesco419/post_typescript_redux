import "./imageUpload.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser, setImg } from "../../../redux/Slices/userSlice";
import {
  sendAxiosState,
  postInterceptor,
} from "../../../functions/APIInterceptor";
import { AxiosResponse } from "axios";
import { setImagePath } from "../../../functions/setImagePath";

export function ImageUpload() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  let files: FileList;
  const upload = document.getElementById("upload") as HTMLDivElement;

  useEffect(() => {
    const btn = document.getElementById("saveimg") as HTMLButtonElement;
    btn.setAttribute("disabled", "");
    return () => {
      btn.removeAttribute("disabled");
    };
  }, []);

  function setimage(e: React.ChangeEvent<HTMLInputElement>) {
    //const reader = new FileReader(); //데이터베이스없을시-0
    files = e.currentTarget.files; //업로드 받은 파일
    //파일 한개이상일시 리턴
    if (files) {
      //파일의 확장자(타입)이 이미지가 아닐경우 리턴
      if (!files[0].type.match("image/.*")) {
        alert("파일이 이미지 형식이 아닙니다.");
        return;
      } else {
        /* console.log("reader");
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          setUrl(reader.result as string);
          console.log(url);
        }; */
        //한개의 이미지파일을 업로드시 Save버튼을 활성화시키고 img태그에 넣기.
        (document.getElementById("preview") as HTMLImageElement | null).src =
          URL.createObjectURL(files[0]);
        (
          document.getElementById("saveimg") as HTMLButtonElement | null
        ).removeAttribute("disabled");
      }
    }
  }

  const updateProfileImg = async () => {
    let formData = new FormData();
    formData.append("img", files[0]);
    formData.append("id", user.value.id);

    let data: sendAxiosState = {
      url: "http://localhost:8080/update/propfileimg",
      data: formData,
      config: {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      },
      callback: (response: AxiosResponse) => {
        if (response.status === 200) {
          let data: sendAxiosState = {
            url: "http://localhost:8080/login",
            data: {
              user_id: user.value.id,
              password: user.value.password,
            },
            config: null,
            callback: (response: AxiosResponse<any, any>) => {
              let resultImg = setImagePath(response.data[0].img);
              //setImg(resultImg[0]);
              dispatch(setImg(resultImg[0]));
            },
          };
          postInterceptor(data);
        }
      },
    };
    postInterceptor(data);
  };

  return (
    <div id="upload" className="wrapper">
      <div className="image-upload">
        <div className="image-preview">
          <img id="preview" className="image-preview-img" alt="preview" />
        </div>
        <div className="image-upload-block">
          <input
            type="file"
            accept="img/*"
            className="image-upload-input"
            onChange={(e) => {
              setimage(e);
            }}
          />
          <div>
            <button
              id="saveimg"
              onClick={() => {
                //후에 form을 이용하여 한번에 업로드;
                updateProfileImg();
                upload.style.display = "none";
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                upload.style.display = "none";
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
