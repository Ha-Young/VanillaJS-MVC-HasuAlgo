import View, { viewInstance } from './view.js'
import {viewInstnace} from './view.js'

function Controller (model, view) {
  const self = this;
  
  self.model = model;
  self.view = view;
}

viewInstance.$typed.addEventListener('keyup', function (event) {
  const key = event.key;

  console.log(key);
  if(event.key === 'Enter') {
    this.value = null;
  }
});

export default Controller
