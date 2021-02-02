import Model from "./model";
import View from "./view";

const $inputNumbers = document.querySelector('.inputNumbers');
const $form = document.querySelector('form');

const controller = new Controller();

$form.addEventListener('submit', controller.submitHandler);

function Controller() {
  const model = new Model();
  const view = new View();

  this.submitHandler = function (event) {
    try {
      event.preventDefault();

      const inputList = model.makeNumber($inputNumbers.value);
      const sortType = $form.querySelector('select').value;

      $inputNumbers.value = '';
      // model.checkValidation(inputList);
      model.saveModel(sortType, inputList); // save
      view.render(inputList); // view
      selectSorting(sortType, inputList); //sort start
    } catch(err) {
      console.log(err.message);
    }
  }

  this.sort = function () {

    async function bubble() {
      console.log('times');
      const $list = view.getCurrentDom();
      let isSwitched = false;
      await after1second();

      for (let i = 1; i < $list.length; i++) {
        if ($list[i - 1].textContent > $list[i].textContent) {
          debugger;
          isSwitched = true;
          // view.changePosition($list[i - 1], $list[i]);
          view.changeDom($list[i - 1], $list[i]);

          await after1second();
        }
      }
      return isSwitched;
    }

    return bubble().then(result => {
      if (result) {
        return this.sort();
      }
      return result;
    });

  }

  // this.bubble = async function () {
  //   console.log('times')
  //   const $list = view.getCurrentDom();
  //   let isSwitched = false;
  //   await after1second();

  //   for (let i = 1; i < $list.length; i++) {
  //     if ($list[i - 1].textContent > $list[i].textContent) {
  //       isSwitched = true;
  //       // view.changePosition($list[i - 1], $list[i]);
  //       view.changeDom($list[i - 1], $list[i]);

  //       await after1second();
  //     }
  //   }

  //   return isSwitched;
  // }
}

async function selectSorting (type) {
  if (type === 'bubble') {
    controller.sort();
  }
  await after1second();
}

function after1second() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });
}



export default controller;
