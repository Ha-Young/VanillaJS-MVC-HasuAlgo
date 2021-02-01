// Load application styles
import '../assets/styles/index.less';

const $typed = document.querySelector(".typed");
const $inputText = document.querySelector(".inputText");
const $contentContainer = document.querySelector(".contentContainer");

$inputText.addEventListener('submit', function () {
  event.preventDefault();

  addChildNode($typed.value);

  $typed.value = null;
});

function addChildNode (value) {
  const child = document.createElement('child');

  child.innerHTML = value;

  $contentContainer.appendChild(child);
}