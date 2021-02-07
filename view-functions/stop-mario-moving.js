export default function stopMarioMoving() {
  const mario = document.querySelector(".mario");
  mario.style.cssText = "animation: runMario 0.8s steps(4) infinite, 7s both infinite linear;";
}
