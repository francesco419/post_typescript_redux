import React, { useEffect, useState } from "react";
import "./UserEdit.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ShowUserEdit } from "../../../redux/Slices/showSlice";
import {
  selectUser,
  setUsername,
  setPassword,
  setImg,
  setEmail,
  setInfo,
  setBirth,
} from "../../../redux/Slices/userSlice";
import {
  sendAxiosState,
  postInterceptor,
} from "../../../functions/APIInterceptor";
import { AxiosResponse } from "axios";

type EditProps = {
  id: string;
  name: string;
  checkpassword: string;
  newpassword: string;
  birth: string;
  email: string;
  info: string;
};

export function UserEdit() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [hide, setHide] = useState<boolean>(true);
  const [exit, setExit] = useState<boolean>(true);
  const [duplicate, setDuplicate] = useState<string>();

  const [input, setInput] = useState<EditProps>({
    id: "",
    name: "",
    checkpassword: "",
    newpassword: "",
    birth: "",
    email: "",
    info: "",
  });

  useEffect(() => {
    setInput({
      ...input,
      ["id"]: user.value.id,
    });
  }, []);

  const Submithandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (input.name !== "") {
      if (duplicate !== "enable to use name") {
        return;
      }
    }
    postUserEdit();
    dispatch(ShowUserEdit());
  };

  const postUserEdit = () => {
    let data: sendAxiosState = {
      url: "http://localhost:8080/userEdit",
      data: input,
      config: null,
      callback: function (response: AxiosResponse) {
        let data = JSON.parse(response.config.data);
        console.log(data);
        if (data.name !== "") {
          dispatch(setUsername(data.name));
        }
        if (data.newpassword !== "") {
          dispatch(setPassword(data.newpassword));
        }
        if (data.birth !== "") {
          dispatch(setBirth(data.birth));
        }
        if (data.email !== "") {
          dispatch(setEmail(data.email));
        }
        if (data.info !== "") {
          dispatch(setInfo(data.info));
        }
      },
    };
    postInterceptor(data);
  };

  const CheckDuplicate = () => {
    if (input.name === "") {
      setDuplicate("please Enter name");
      return;
    }
    postDuplicate();
  };

  const postDuplicate = () => {
    let data: sendAxiosState = {
      url: "http://localhost:8080/checkDuplicate",
      data: { name: input.name },
      config: null,
      callback: function (response: AxiosResponse) {
        if (response.data) {
          setDuplicate("Name already in use");
        } else {
          setDuplicate("enable to use name");
        }
      },
    };
    postInterceptor(data);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  function CancelAndQuit() {
    return (
      <div style={{ display: exit ? "none" : "flex" }} className="ask-exit">
        <p>Discard Changes and Leave?</p>
        <div className="ask-exit-btn">
          <button
            onClick={() => {
              setExit((exit) => !exit);
              dispatch(ShowUserEdit());
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setExit((exit) => !exit);
            }}
          >
            No
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="edit" className="wrapper-Edit">
      <div className="user-edit">
        {/* user-edit은 이후에 form형태 */}
        <div className="user-primary-block">
          <div className="user-primary">
            <p>Name : </p>
            <input
              id="setting-username"
              className="user-input"
              type="text"
              autoComplete="off"
              name="name"
              minLength={5}
              maxLength={12}
              onChange={(e) => onChangeHandler(e)}
            />
            <button onClick={CheckDuplicate}>Check</button>
          </div>
          <p
            style={{
              fontSize: "12px",
              margin: "0",
              color: duplicate === "enable to use name" ? "#0984e3" : "#ff0000",
            }}
          >
            {duplicate}
          </p>
          <div className="user-primary">
            <p>Password : </p>
            <input
              id="setting-password"
              className="user-input"
              type="password"
              name="checkpassword"
              minLength={4}
              maxLength={15}
              onChange={(e) => onChangeHandler(e)}
            />
            <button
              onClick={() => {
                if (input.checkpassword === user.value.password) {
                  setHide(false);
                }
              }}
            >
              Check
            </button>
          </div>
          <div
            style={{ display: hide ? "none" : "flex" }}
            className="user-primary-hidden"
          >
            <input
              id="setting-newpassword"
              className="user-input-none"
              type="password"
              name="newpassword"
              minLength={4}
              maxLength={15}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div className="user-primary">
            <p>Birth : </p>
            <input
              id="setting-birth"
              className="user-input"
              type="date"
              name="birth"
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div className="user-primary">
            <p>Email : </p>
            <input
              id="setting-email"
              className="user-input"
              type="email"
              placeholder="SocialNetwork@gmail.com"
              name="email"
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
        </div>
        <div className="user-secondary-block">
          <div className="user-secondary">
            <p>{"<Info>"}</p>
            <input
              id="setting-intro"
              className="user-input-info"
              type="text"
              name="info"
              maxLength={150}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
        </div>
        <div className="user-save">
          <button
            type="submit"
            className="user-save-btn"
            onClick={(e) => Submithandler(e)}
          >
            Submit
          </button>
          <button
            className="user-save-btn"
            onClick={() => {
              setExit((exit) => !exit);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <CancelAndQuit />
    </div>
  );
}
