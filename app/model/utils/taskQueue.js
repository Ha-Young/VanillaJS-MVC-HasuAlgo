export default function UITaskQueue() {
  const taskQueue = [];

  /**
   *
   * @param {} task
   */
  this.add = function (task) {
    taskQueue.push(task)
  }
}
