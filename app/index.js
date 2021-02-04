// Load application styles
import '../assets/styles/index.less';
import { Model } from './models/model';
import { View } from './views/view';
import { Controller } from './controllers/contorller';
import { BubbleView } from './views/bubbleView';
import { BubbleController } from './controllers/bubbleController';

const BubbleSort = function() {
  /* 
  this.model = new Model();
  this.bubbleView = new BubbleView();
  this.bubbleController = new BubbleController();
  this.view = new View(this.bubbleView);
  this.controller = new Controller(this.model, this.view, this.bubbleController); 
  */

  this.model = new Model();
  this.view = new View();
  this.controller = new Controller(this.model, this.view);
}

const App = new BubbleSort();

App.controller.events();
