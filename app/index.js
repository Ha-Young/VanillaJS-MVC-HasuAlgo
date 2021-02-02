// Load application styles
import "../assets/styles/index.less";
import { Controller } from "./controller";
import { Model } from "./model";
import { View } from "./view";

// ================================
// START YOUR APP HERE
// ================================

const Sort = function () {
  this.view = new View();
  this.model = new Model();
  this.controller = new Controller(this.model, this.view);
};

return new Sort();

// console.log("여기서 작업하세요!");
