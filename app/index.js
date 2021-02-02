// Load application styles
import '../assets/styles/index.less'
import Model from './model.js'
import View from './view.js'
import Controller from './controller'

function Todo () {
  this.model = new Model();
  this.view = new View();
  this.controller = new Controller();
}

const todo = new Todo();

$inputText.addEventListener('keyup', function () {
  event.preventDefault();

  addChildNode($typed.value);

  $typed.value = null;
});

function addChildNode (value) {
  const $child = document.createElement('child');

  $child.innerHTML = value;
  $child.classList.add("graphNode");

  $child.style.height = value + 5 + 'px';

  $contentContainer.appendChild($child);
}

console.log(document.querySelectorAll('.graphNode'));