import getMyElements from "../model/get-my-elements";
import { inputDatas } from "../model/user-input-data";

const { sortingBoard } = getMyElements();

export default function changePipeToClouds() {
  inputDatas.nodes.forEach(eachNode => {
    eachNode.classList.add("mergeChart");
    eachNode.style.height = "100px";
    eachNode.style.width = "100px";
  });

  sortingBoard.classList.add("merge-container");

  const pipes = document.querySelectorAll(".pipe");

  pipes.forEach(pipe => {
    pipe.classList.add("number-cloud");
  });

  const clouds = document.querySelector(".clouds-container");
  clouds.style.cssText = "visibility: hidden";
}
