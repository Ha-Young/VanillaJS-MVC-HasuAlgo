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
    this.unsortedArray = this.filteredData.split("").map((num) => Number(num));
    this.sortedArray = this.unsortedArray.slice();
  }
}
