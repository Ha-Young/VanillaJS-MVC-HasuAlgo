import Model from "../model.js";

export default function QuickModel() {
  this._storage = null;
}

QuickModel.prototype = Object.create(Model.prototype);
QuickModel.prototype.constructor = QuickModel;
