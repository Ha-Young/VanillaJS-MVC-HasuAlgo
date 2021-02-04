export { Model };

class Model {
  constructor() {
    this.data = null;
    this.filteredData = null;
    this.unsortedArray = null;
    this.sortedArray = null;
  }

  addData(data) {
    this.data = data;
    this.filteredData = data.replaceAll(',', '').replace(/ /g, '');
    this.unsortedArray = data.replace(/ /g, '').split(",").map((num) => Number(num));
    this.sortedArray = this.unsortedArray.slice();
  }
}
