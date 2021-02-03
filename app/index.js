// Load application styles
import '../assets/styles/index.less';
import { BubbleController } from './controllers/bubbleController';

const app = new BubbleController();

app.init();

/*

import '../assets/styles/index.less';
import { BubbleModel } from './models/bubbleModel'
import { BubbleController } from './controllers/bubbleController';
import { BubbleView } from './views/bubbleView';

const bubbleSort = function() {
  this.app = new BubbleController; 
}

*/
