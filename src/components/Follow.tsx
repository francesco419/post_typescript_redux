import { useEffect } from "react";
import "../getscss.scss";

export function Follow() {
  function pointermove(string: string) {
    const move = document.getElementById(string);
    document.addEventListener("mousemove", (e: MouseEvent) => {
      move.style.left = e.clientX + "px";
      move.style.top = e.clientY + "px";
    });
  }
  useEffect(() => {
    pointermove("follow");
  });
  return (
    <div id="follow" className="follow">
      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  );
}
