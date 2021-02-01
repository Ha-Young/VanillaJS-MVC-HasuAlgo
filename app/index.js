// Load application styles
import '../assets/styles/index.less';

const $typed = document.querySelector(".typed");

document.querySelector('.inputText').addEventListener('submit', function () {
  event.preventDefault();
  console.log($typed.value);
});
