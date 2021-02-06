// Load application styles
import "../assets/styles/index.less";
import Model from "./model";
import Controller from "./controller";
import View from "./view";

const app = new Controller(new Model(), new View());
app.run();
