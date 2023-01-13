import styles from "./Login.module.scss";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setUsername, setPassword, selectUser } from "../redux/user/userSlice";

function Login() {
  //const searchChange = ({ target: { value } }) => setSearchResult(value);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [display, setDisplay] = useState<boolean>(false);

  const Onclick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const username = document.getElementById(
      "username"
    ) as HTMLInputElement | null;
    const password = document.getElementById(
      "password"
    ) as HTMLInputElement | null;

    const uservalue: string = username.value;
    const passvalue: string = password.value;

    if (uservalue && passvalue) {
      if (uservalue.length < 13 && passvalue.length > 5) {
        //username min 6 to max 13
        if (passvalue.length < 16 && passvalue.length > 7) {
          //password min 8 to max 15
          dispatch(setUsername(username.value)); //store by redux
          dispatch(setPassword(password.value));
          setDisplay(true); //show LoginSuccess
        } else {
          alert(
            "username must be between 6 ~ 12 letters,\npassword must be between 8 ~ 15 letters"
          );
          username.value = ""; //clear input value
          password.value = "";
        }
      } else {
        alert(
          "username must be between 6 ~ 12 letters,\npassword must be between 8 ~ 15 letters"
        );
        username.value = "";
        password.value = "";
      }
      //navigate("/");
    } else {
      alert(`userName과 password를 입력해주시기 바랍니다.`);
    }
  };

  function LoginForm() {
    return (
      <form>
        <div className={styles["login-form"]}>
          <p>User_ID</p>
          <input
            id="username"
            type="text"
            placeholder="type username..."
          ></input>
          <p>Password</p>
          <input
            id="password"
            type="password"
            placeholder="type password..."
          ></input>
        </div>
        <input type="submit" value="Submit" onClick={Onclick} />
      </form>
    );
  }

  function LoginSuccess() {
    return (
      <div id="loginsuccess" className={styles["login-success"]}>
        <p>Login Success !</p>
        <div className={styles["login-success-box"]}>
          <p>{`Welcome "${user.username}". Good to see you..`}</p>
          <button
            className={styles["buttton-login-nav"]}
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-container"]}>
        <div className={styles["login-box"]}>
          <div>
            <p>Login</p>
          </div>
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
      {display && <LoginSuccess />}
    </div>
  );
}

export default Login;
