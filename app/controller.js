import { Model, View } from './index';

function Controller() {
  this.model = new Model();
  this.view = new View();

  this.submitHandler = function () {
    try {
      const $inputNumbers = document.querySelector('.inputNumbers');
      const inputList = this.model.makeNumber($inputNumbers.value);
      const sortType = document.querySelector('select').value;

      $inputNumbers.value = '';
      // model.checkValidation(inputList);
      this.model.saveModel(sortType, inputList);
      this.view.render(inputList);

      this.asyncRecursion(sortType, inputList);
    } catch(err) {
      console.log(err.message);
    }
  }

  this.asyncRecursion = async function (sortType, list) {
    if (sortType === 'bubble') {
      const hasChanged = await this.bubbleSort(list);
      if (hasChanged) await this.asyncRecursion(sortType, list);
    }
  }

  this.bubbleSort = async function (list) {
    let hasChanged = false;

    for (let i = 1; i < list.length; i++) {
      const BUBBLE_SORT = list[i - 1] > list[i];
      if (BUBBLE_SORT) {
        [list[i - 1], list[i]] = [list[i], list[i - 1]];


        hasChanged = await this.view.changeDom(i - 1, i)
          .then(result => this.view.bubbleChange(result));
      }
    }

    return hasChanged;
  }
}


const controller = new Controller();
const $form = document.querySelector('form');
$form.addEventListener('submit', handler);

function handler(event) {
  event.preventDefault();
  controller.submitHandler();
}

export default controller;
