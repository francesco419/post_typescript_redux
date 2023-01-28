import { AxiosResponse } from "axios";
import { config } from "process";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Header } from "../components/Header";
import { getInterceptor, sendAxiosState } from "../functions/APIInterceptor";
import "./Search.scss";

export default function Search() {
  const params = useParams();
  const paramName = params.id;
  useEffect(() => {
    getSearchPost();
  }, []);

  const getSearchPost = () => {
    let data: sendAxiosState = {
      url: "http://localhost:8080/search/post",
      config: {
        name: paramName,
      },
      callback: function (response: AxiosResponse) {
        console.log(response);
      },
    };

    getInterceptor(data);
  };

  return (
    <div>
      <Header />
      <div className="search-page">
        <div className="block-search-container"></div>
      </div>
    </div>
  );
}
