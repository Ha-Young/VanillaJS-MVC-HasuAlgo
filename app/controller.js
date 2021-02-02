import View, { viewInstance } from './view.js'
import {modelInstance} from './model.js'

function Controller (model, view) {
  const self = this;
  
  self.model = model;
  self.view = view;
}

function addChildNode (value) {
  viewInstance.$child = document.createElement('child');
  viewInstance.$child.innerHTML = value;
  viewInstance.$child.classList.add("graphNode");
  viewInstance.$child.style.height = value + 5 + 'px';
  viewInstance.$contentContainer.appendChild(viewInstance.$child);
} 

function handleKeyUp(event) {

  event.stopImmediatePropagation();

  if (event.key === 'Enter') { 
    addChildNode(viewInstance.$typed.value);

    this.value = null;
  }
}

viewInstance.$typed.addEventListener('keypress', handleKeyUp);

export default Controller
