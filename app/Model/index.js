import { ERROR } from "../common/constant";

function Model() {
  this._taskQueue = [];
  this._sortList = [];
}

Model.prototype.addTask = function (state, from, to) {
  const task = this.newTask(state, from, to);
  this._taskQueue.push(task);
};

Model.prototype.newTask = function (state, from, to) {
  const task = {};

  task.state = state;
  task.from = from;
  task.to = to;

  return task;
};

Model.prototype.addSortItem = function (number) {
  if (!number) {
    return;
  }

  if (this._sortList.length < 10) {
    this._sortList.push(number);
    return;
  }

  alert(ERROR.MAX_NUMBER);
  return;
};

export default Model;
