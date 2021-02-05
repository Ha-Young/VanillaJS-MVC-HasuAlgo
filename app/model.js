export { Model };

class Model {
  constructor() {
    this.data = null;
    this.filteredData = null;
    this.unsortedArray = null;
    this.sortedArray = null;
    this.tasks = [];
  }

  addData(data) {
    this.data = data;
    this.filteredData = data.replaceAll(',', '').replace(/ /g, '');
    this.unsortedArray = data.replace(/ /gm, "").replace(/^,|,$/gm, '').split(",").map((num) => Number(num));
    this.sortedArray = this.unsortedArray.slice();
  }

  createTask(name, leftBarIndex, rightBarIndex) {
    return {
      name,
      leftBarIndex,
      rightBarIndex,
    };
  }

  addTask(task) {
    this.tasks.push(task);
  }
}
