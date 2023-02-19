import "./EditPost.scss";
import { PostState } from "../../redux/Slices/postSlice";
import React, { useState } from "react";
import {
  sendFilesPost,
  setFilesOnState,
  setTagsOnState,
} from "../../functions/Formdata";

type Edit = {
  props: PostState;
  func?: () => void;
};

export default function EditPost({ props, func }: Edit) {
  let [text, setText] = useState<string>(props.text);
  let [tags, setTags] = useState<string>(props.tag.join());
  let [tagArr, setTagArr] = useState<string[]>([...props.tag]);
  let [fileArr, setFileArr] = useState<File[]>([]);
  const [quitFunc, setQuitFunc] = useState<boolean>(false);

  const onchangetexts = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText((text) => e.target.value);
  };

  const onchangeTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags((tags) => e.target.value);
  };

  const onQuitHandler = () => {
    setQuitFunc((quitFunc) => !quitFunc);
  };

  let temp: PostState = {
    id: null,
    name: null,
    text: text,
    tag: tagArr,
    date: null,
    img: null,
    code: props.code,
  };

  return (
    <div id={`edit${props.code}`} className="edit-post">
      <textarea
        id={`${props.code}_text`}
        autoComplete="off"
        value={text}
        onChange={(e) => onchangetexts(e)}
      ></textarea>
      <input
        type="text"
        value={tags}
        autoComplete="off"
        onChange={(e) => onchangeTags(e)}
        onBlur={() => setTagsOnState(setTagArr, null, tags)}
      />
      <input
        type="file"
        accept="img/*"
        multiple
        onChange={(e) => setFilesOnState(e, setFileArr)}
      />
      <div className="edit-post__imgBox">
        {fileArr.map((data, index) => (
          <img
            className="edit-post__img"
            src={window.URL.createObjectURL(data)}
            alt="editImage"
            key={`image_${index}`}
          />
        ))}
      </div>
      <div className="edit-post__btnBox">
        <button onClick={() => sendFilesPost(temp, fileArr, "put", func)}>
          Edit
        </button>
        <button onClick={onQuitHandler}>Cancel</button>
      </div>
      {quitFunc && (
        <div className="edit-post__quit">
          <p>Quit without Edit?</p>
          <div>
            <button
              onClick={() => {
                onQuitHandler();
                func();
              }}
            >
              Yes
            </button>
            <button onClick={onQuitHandler}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
