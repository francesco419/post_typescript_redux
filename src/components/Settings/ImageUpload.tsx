import "./ImageUpload.scss";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setImg } from "../../redux/Slices/userSlice";

export function ImageUpload() {
  const dispatch = useAppDispatch();
  const [url, setUrl] = useState<string>();
  const upload = document.getElementById("upload") as HTMLDivElement;

  useEffect(() => {
    const btn = document.getElementById("saveimg") as HTMLButtonElement;
    btn.setAttribute("disabled", "");
  }, []);

  function setimage(e: React.ChangeEvent<HTMLInputElement>) {
    //const reader = new FileReader(); //데이터베이스없을시-0
    const files = e.currentTarget.files; //업로드 받은 파일
    //파일 한개이상일시 리턴
    if (files) {
      if ([files].length > 1) {
        alert("이미지 파일은 한개만 업로드 가능합니다.");
        return;
      } else {
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
          setUrl(URL.createObjectURL(files[0]));
          (document.getElementById("preview") as HTMLImageElement).src = url;
          (
            document.getElementById("saveimg") as HTMLButtonElement
          ).removeAttribute("disabled");
        }
      }
    }
  }
  return (
    <div id="upload" className="wrapper">
      <div className="image-upload">
        <div className="image-preview">
          <img id="preview" className="image-preview-img" />
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
                dispatch(setImg(url)); //후에 form을 이용하여 한번에 업로드;
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
