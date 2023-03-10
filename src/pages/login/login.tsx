import "./login.scss";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectUser, setInitial, setImg } from "../../redux/Slices/userSlice";
import Join from "./join";
import {
  sendAxiosState,
  postInterceptor,
} from "../../functions/APIInterceptor";
import { AxiosResponse } from "axios";
import { setImagePath } from "../../functions/setImagePath";

type LoginProps = {
  user_id: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [join, setJoin] = useState<boolean>(false);

  function LoginForm() {
    const [input, setInput] = useState<LoginProps>({
      user_id: "",
      password: "",
    });
    const { user_id, password } = input;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      //console.log(e.target);
      console.log(name + " : " + value);
      setInput({
        ...input,
        [name]: value,
      });
    };

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      function nullAnimation(id: string) {
        const doc = document.getElementById(id) as HTMLLabelElement | null;
        console.log(doc);
        doc.classList.add("error-blank");

        setTimeout(() => {
          doc.classList.remove("error-blank");
        }, 1000);
      }

      if (!(user_id && password)) {
        if (!user_id && !password) {
          console.log(1);
          nullAnimation("lb_id");
          nullAnimation("lb_pw");
          return;
        } else if (!password) {
          console.log(2);
          nullAnimation("lb_pw");
          return;
        } else {
          console.log(3);
          nullAnimation("lb_id");
          return;
        }
      }

      logInCheck();
    };

    const postcallback = (response: AxiosResponse<any, any>) => {
      dispatch(setInitial(response.data[0]));
      let temp = setImagePath(response.data[0].img);
      dispatch(setImg(temp[0]));
      navigate("/");
    };

    const logInCheck = async () => {
      let data: sendAxiosState = {
        url: "http://localhost:8080/login",
        data: {
          user_id: input.user_id,
          password: input.password,
        },
        config: null,
        callback: postcallback,
      };
      postInterceptor(data);
    };

    return (
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <label id="lb_id">User_ID : </label>
        <input
          type="text"
          placeholder="id"
          name="user_id"
          maxLength={15}
          autoComplete="off"
          onChange={(e) => onChangeHandler(e)}
        />
        <label id="lb_pw">Password : </label>
        <input
          type="password"
          placeholder="password"
          name="password"
          maxLength={15}
          autoComplete="off"
          onChange={(e) => {
            onChangeHandler(e);
          }}
        ></input>
        <div className="block-login-btn">
          <button type="submit">Login</button>
          <button
            type="button"
            onClick={() => {
              setJoin((join) => !join);
            }}
          >
            Join
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="login-page">
      {join && <Join />}
      <div className="login-container">
        <div className="login-box">
          <h1>Login</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
