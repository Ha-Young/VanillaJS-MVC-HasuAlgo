// Load application styles
import "../assets/styles/index.less";
import Controller from "./controller";
import Model from "./model";
import View from "./view";

const Sort = function () {
  this.view = new View();
  this.model = new Model();
  this.controller = new Controller(this.model, this.view);
};

const sort = new Sort();

function setView() {
  sort.controller.setView(document.location.hash);
}

function removeLocationHash() {
  const noHashURL = window.location.href.replace(/#.*$/, "");
  window.history.replaceState("", document.title, noHashURL);
}

$on(window, "load", removeLocationHash);
$on(window, "hashchange", setView);

return sort;
