import '../assets/styles/index.less';
import {Model} from '../app/model';
import {View} from '../app/view';
import {Controller} from '../app/controller';

function Main() {
  this.model = new Model();
  this.view = new View();
  this.controller = new Controller(this.model, this.view);
}

function checkInput () {
  const input = document.querySelector("input");
  console.log(input);
}

var main = new Main();
main.controller.getData();