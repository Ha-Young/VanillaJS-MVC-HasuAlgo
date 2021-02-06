import getMyElements from "../model/get-my-elements";

const { canvas } = getMyElements();

export default function changeBarToCircle() {
  canvas.classList.add("merge-container");

  const pipes = document.querySelectorAll(".pipe");

  pipes.forEach(pipe => {
    pipe.classList.add("number-cloud");
  });

  const clouds = document.querySelector(".clouds-container");
  clouds.style.cssText = "visibility: hidden";
}
