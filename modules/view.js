export default class View {
  "use strict";

  /**
   * @param {!Template} template A Template instance
   */
  constructor(template) {
    this.template = template;
  }

  render(parentNode) {
    parentNode.innerHTML = this.template;
  }

  update(i,j) {
    const ith = document.querySelector("#i");
    const jth = document.querySelector("#j");
    
  }
}