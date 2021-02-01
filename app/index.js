import { View } from './view';
import { Model } from './model';
import { Controller } from './controller';
import '../assets/styles/index.less';

new Controller(new Model(), new View());
