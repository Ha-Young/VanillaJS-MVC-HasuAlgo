import getMyElements from "../model/get-my-elements";
import { inputDatas } from "../model/user-input-data";

const { canvas } = getMyElements();

export default function changeBarToCircle() {

  inputDatas.nodes.forEach(eachNode => {
    eachNode.classList.add("mergeChart");
    eachNode.style.height = "100px";
    eachNode.style.width = "100px";
  });

  canvas.classList.add("merge-container");

  const pipes = document.querySelectorAll(".pipe");

  pipes.forEach(pipe => {
    pipe.classList.add("number-cloud");
  });

  const clouds = document.querySelector(".clouds-container");
  clouds.style.cssText = "visibility: hidden";
}
