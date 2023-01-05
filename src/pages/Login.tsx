import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import React from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setUsername, setPassword, selectUser } from "../redux/user/userSlice";

function Login() {
  //const searchChange = ({ target: { value } }) => setSearchResult(value);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const Onclick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    const username = document.getElementById(
      "username"
    ) as HTMLInputElement | null;
    const password = document.getElementById(
      "password"
    ) as HTMLInputElement | null;

    if (username.value && password.value) {
      dispatch(setUsername(username.value));
      dispatch(setPassword(password.value));
      navigate("/");
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
    </div>
  );
}

export default Login;
