export default function UItaskQueue() {
  "use strict";

  const taskQueue = [];

  this.enqueue = function(task) {
    taskQueue.push(task);
  }

  this.dequeue = function() {
    return taskQueue.shift();
  }
}
