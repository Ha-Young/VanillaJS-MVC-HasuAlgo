import { UITaskSet } from '../../common/typeDef';

export default function UITaskQueue() {
  this.taskQueue = [];

  /**
   * @param {UITaskSet} taskSet
   */
  this.enqueue = function (taskSet) {
    this.taskQueue.push(taskSet);
  }

  /**
   * @return {UITaskSet} taskSet
   */
  this.dequeue = function () {
    return this.taskQueue.shift();
  }

  this.checkTask = function () {
    return this.taskQueue.length > 0 ? true : false;
  }

  this.reset = function () {
    this.taskQueue = [];
  }
}
