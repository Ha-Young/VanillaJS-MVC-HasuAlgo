import "../assets/styles/index.less";
import Controller from "./controller";
import Model from "./model";
import View from "./view";

class Sort {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.controller = new Controller(this.model, this.view);
  }

  setView() {
    this.controller.setView(document.location.hash);
    this.model = new Model();
    this.view = new View();
    this.controller = new Controller(this.model, this.view);
  }

  removeLocationHash() {
    const noHashURL = window.location.href.replace(/#.*$/, "");
    window.history.replaceState("", document.title, noHashURL);
  }
}

const sort = new Sort();

$on(window, "load", sort.removeLocationHash);
$on(window, "hashchange", sort.setView.bind(sort));

return sort;
