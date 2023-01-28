import "./Join.scss";
import { useState } from "react";
import axios from "axios";
import { sendAxiosState, postInterceptor } from "../functions/APIInterceptor";

interface InputProps {
  user_id: string;
  user_name: string;
  user_password: string;
  user_birth: string;
  user_email: string;
}

export default function Join() {
  const [inputs, setInputs] = useState<InputProps>({
    user_id: "",
    user_name: "",
    user_password: "",
    user_birth: "",
    user_email: "",
  });

  const { user_id, user_name, user_password, user_birth, user_email } = inputs;

  const [ConfirmPassword, setConfirmPassword] = useState<string>();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //console.log(e.target);
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const confirmpPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword((ConfirmPassword) => value);
    console.log(ConfirmPassword);
    (
      document.getElementById("password_match") as HTMLParagraphElement | null
    ).style.display = "block";
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user_password !== ConfirmPassword) {
      console.log("password does not match");
      return false;
    }

    let data: sendAxiosState = {
      url: "http://localhost:8080/login/register",
      config: {
        user_id: user_id,
        user_name: user_name,
        user_password: user_password,
        user_birth: user_birth,
        user_email: user_email,
      },
      callback: function () {
        (
          document.getElementById("success") as HTMLDivElement | null
        ).style.display = "block";
      },
    };

    postInterceptor(data);
  };

  function SuccessReg() {
    return (
      <div id="success" className="popup-login-success">
        <p>회원가입 성공!</p>
        <button
          onClick={() => {
            (
              document.getElementById("success") as HTMLDivElement | null
            ).style.display = "none";
            (
              document.getElementById("join") as HTMLDivElement | null
            ).style.display = "none";
          }}
        >
          확인
        </button>
      </div>
    );
  }

  return (
    <div id="join" className="wrapper10">
      <div className="block-join">
        <h2>Register</h2>
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <label>Name : </label>
          <input
            type="text"
            placeholder="name"
            name="user_name"
            maxLength={15}
            autoComplete="off"
            required
            onChange={(e) => onChangeHandler(e)}
          />
          <label>ID : </label>
          <input
            type="text"
            placeholder="id"
            name="user_id"
            maxLength={15}
            autoComplete="off"
            required
            onChange={(e) => onChangeHandler(e)}
          />
          <label>Passsword :</label>
          <input
            type="password"
            placeholder="password"
            name="user_password"
            maxLength={15}
            required
            autoComplete="off"
            onChange={(e) => onChangeHandler(e)}
          />
          <label style={{ fontSize: "13px" }}>Confirm Passsword :</label>
          <input
            type="password"
            placeholder="password2"
            maxLength={15}
            required
            autoComplete="off"
            onChange={(e) => confirmpPasswordHandler(e)}
          />
          <p
            id="password_match"
            style={{
              fontSize: "10px",
              color: user_password === ConfirmPassword ? "#0984e3" : "#ff0000",
              margin: "0 0 5px 0",
              display: "none",
            }}
          >
            {user_password === ConfirmPassword
              ? "password matched"
              : "password does not match"}
          </p>
          <label>Birth :</label>
          <input
            type="date"
            name="user_birth"
            onChange={(e) => onChangeHandler(e)}
          />
          <label>Email :</label>
          <input
            type="email"
            placeholder="email"
            name="user_email"
            autoComplete="off"
            onChange={(e) => onChangeHandler(e)}
          />
          <div>
            <button type="submit">Submit</button>
            <button
              type="button"
              className="btn-join-cancel"
              onClick={() => {
                (
                  document.getElementById("join") as HTMLDivElement | null
                ).style.display = "none";
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <SuccessReg />
    </div>
  );
}
