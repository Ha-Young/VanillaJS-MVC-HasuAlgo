import { countBy } from "lodash";

export default function Model() {
  this.storage = [];
};

Model.prototype.loadDataFromController = function (data) { // this = model
  this.storage = data;
  console.log(data)
}
