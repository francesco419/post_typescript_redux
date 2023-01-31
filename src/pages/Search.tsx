import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header } from "../components/header/Header";
import {
  getInterceptor,
  sendAxiosState,
  postInterceptor,
} from "../functions/APIInterceptor";
import "./Search.scss";
import { PostState } from "../redux/Slices/postSlice";
import ImageSlide from "../components/post/ImageSlide";
import ProfilePost from "../components/ProfilePost";
import { setImagePath } from "../functions/setImagePath";

export default function Search() {
  const params = useParams();
  const paramName = params.id;
  const [post, setPost] = useState<PostState[]>([]);

  useEffect(() => {
    getSearchPost();
  }, []);

  const getSearchPost = () => {
    let data: sendAxiosState = {
      url: "http://localhost:8080/search/post",
      data: {
        name: paramName,
      },
      config: null,
      callback: function (response: AxiosResponse) {
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            let temp: PostState = {
              id: response.data[i].id,
              name: response.data[i].name,
              text: response.data[i].text,
              date: response.data[i].date,
              tag: JSON.parse(response.data[i].tag),
              img: setImagePath(response.data[i].img),
            };
            setPost((post) => [...post, temp]);
          }
          return;
        }
        if (response.data.length === 0) {
          setPost((post) => [
            ...post,
            {
              id: "결색결과 없음",
              name: "결색결과 없음",
              text: "결색결과 없음",
              date: "0000-00-00",
              tag: ["#검색결과없음"],
              img: [],
            },
          ]);
          return;
        }
      },
    };

    postInterceptor(data);
  };

  console.log(post);
  return (
    <div>
      <Header />
      <div className="search-page">
        <div className="block-search-container">
          {post.map((data, index) => (
            <div className="block-search-post" key={`search${index}`}>
              <ProfilePost PostState={data} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
