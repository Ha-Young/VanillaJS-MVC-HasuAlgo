// Load application styles
import '../assets/styles/reset.less';
import '../assets/styles/mario.less';
import '../assets/styles/sort.less';
import '../assets/styles/index.less';
import Controller from '../mvc-class/controller';
import Model from '../mvc-class/model';
import View from '../mvc-class/view';


// ================================
// START YOUR APP HERE
// ================================

const app = new Controller(new Model(), new View());
