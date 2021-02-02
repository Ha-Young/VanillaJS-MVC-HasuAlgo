export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.startBtn = document.querySelector('.user-input-btn');
    this.inputTable = document.querySelector('.user-input-table');
    this.graphTable = document.querySelector('.article');
  }

  run() {
    let isClicked = false;
    this.startBtn.addEventListener(('click'), () => {
      if (!isClicked && this.inputTable.value) {
        this.init();
        this.sort();
        isClicked = true;
      }
    });
  }

  init() {
    const userValue = this.model.set(this.inputTable.value);
    this.view.render(userValue);
    console.log(this.graphTable.children);
  }

  async sort() {
    for (let i = 0; i < this.graphTable.children.length; i++) {
      let swap;
      for (let j = 0; j < this.graphTable.children.length - 1 - i; j++) {
        const left = this.graphTable.children[j];
        const right = this.graphTable.children[j + 1];

        this.view.clearAllColor(this.graphTable);
        await this.view.renderDefaultColor(left, right);

        console.log('left', left);
        console.log('right', right);

        if (Number(left.dataset.id) > Number(right.dataset.id)) {
          console.log(`${left.dataset.id} is bigger then ${right.dataset.id}`);
          // 스왑을 먼저 하고
          await this.view.swap(left, right);
          this.model.swap(left, right);

          this.view.clearAllColor(this.graphTable);
          swap = true;
        }
      }
      console.log(`${i}회전 : ${this.graphTable}`);
      if (!swap) {
        this.view.clearAllColor(this.graphTable);
        return;
      }
    }
  }

  giveTimelag() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}

