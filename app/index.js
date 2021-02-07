// Load application styles
import  '../assets/styles/index.less';
import Controller from './controller';
import Model from './model';
import View from './view';

// ================================
// START YOUR APP HERE
// ================================

function App() {
  this.controller = new Controller(new Model(), new View());
}

new App();
