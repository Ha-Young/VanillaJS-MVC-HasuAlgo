import '../assets/styles/index.less';
import {Model} from '../app/model';
import {View} from '../app/view';
import {Controller} from '../app/controller';

function Main() {
  this.model = new Model();
  this.view = new View();
  this.controller = new Controller(this.model, this.view);
}

const main = new Main();
main.controller.getData();
