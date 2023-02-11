import "./postTableView.scss";
import { PostState, selectPost } from "../../redux/Slices/postSlice";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import React from "react";

interface TableComp {
  data: PostState;
}
export default function PostTableView() {
  const post = useAppSelector(selectPost);

  return (
    <div className="block-tableview">
      <div className="block-tableview-0">
        {post.value.map((post, index) => (
          <TableComponent data={post} key={`table${index}`} />
        ))}
      </div>
    </div>
  );
}

const TableComponent = function TableComponent(data: TableComp) {
  return (
    <div className="block-tablecomp">
      <div className="block-tablecomp-img">
        <img src={data.data.img[0]} />
      </div>
      <div className="block-tablecomp-hidden">
        <p>{data.data.name}</p>
        <p>{data.data.tag}</p>
      </div>
    </div>
  );
};
