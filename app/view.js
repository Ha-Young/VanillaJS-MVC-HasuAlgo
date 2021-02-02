import { transform } from "lodash";

export default class View {
  constructor() {
    this.graphTable = document.querySelector('.article');
  }

  render(userInputData) {
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

  swap(left, right) {
    left.removeAttribute('translate');
    right.removeAttribute('translate');

    console.log('imin');
    console.log('left coord', left.getBoundingClientRect().left);
    console.log('right coord', right.getBoundingClientRect().left);

    const finalLeftStyle = left.getBoundingClientRect().left - right.getBoundingClientRect().left;
    const finalRightStyle = right.getBoundingClientRect().left - left.getBoundingClientRect().left;
    console.log('this is finalStyle', finalLeftStyle, finalRightStyle);

    left.style.transform = `translate(${finalRightStyle}px`;
    right.style.transform = `translate(${finalLeftStyle}px`;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
}
