import { transform } from "lodash";

export default class View {
  constructor() {
    this.graphTable = document.querySelector('.article');
  }

  render(userInputData) {
    this.graphTable.innerHTML = null;

    for (let i = 0; i < userInputData.length; i++) {
      const graphPercent = userInputData[i];
      const $graph = document.createElement('div');
      $graph.classList.add('graph-item');
      $graph.style.width = '10%';
      $graph.style.height = `${graphPercent}%`;
      $graph.dataset.id = userInputData[i];
      this.graphTable.appendChild($graph);
    }
  }

  update() {
  }

  clearAllColor(graphs) {
    for (let i = 0; i < graphs.children.length; i++) {
      graphs.children[i].classList.remove('current-graph');
    }
  }

  renderDefaultColor(left, right) {
    return new Promise(resolve => {
      left.classList.add('current-graph');
      right.classList.add('current-graph');
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  /*
  setZeroTranstion(left, right) {
    return new Promise(resolve => {
      setTimeout(() => {
        const changedLeft = left.getBoundingClientRect();
        console.log('changedLeft', changedLeft);
        console.log('tozeroTranasition');

        left.style.transform = `translate(${0}px`;
        right.style.transform = `translate(${0}px`;
        resolve();
      }, 2000);
    });
  }
  */

  async swap(left, right) {
    const finalLeftStyle = left.getBoundingClientRect().left - right.getBoundingClientRect().left;
    const finalRightStyle = right.getBoundingClientRect().left - left.getBoundingClientRect().left;

    left.animate(
      { transform: `translate(${finalRightStyle}px)` },
      { duration: 1000, fill: 'forwards' }
    );

    right.animate(
      { transform: `translate(${finalLeftStyle}px)` },
      { duration: 1000, fill: 'forwards' }
    );

    /*
    left.style.transform = `translate(${finalRightStyle}px`;
    right.style.transform = `translate(${finalLeftStyle}px`;
    */


    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
}
