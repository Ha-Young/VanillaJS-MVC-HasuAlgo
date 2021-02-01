// Load application styles
import '../assets/styles/index.less';
import dataModel from './model';
import controller from './controller';
import view from './view';

// ================================
// START YOUR APP HERE
// ================================

(function () {
  'use strict';

  /**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	function visualSort(name) {
		this.storage = new app.Store(name);
		this.model = new app.Model(this.storage);
		// this.template = new app.Template();
		this.view = new app.View(this.template);
		this.controller = new app.Controller(this.model, this.view);
	}

	const visualSort = new visualSort('visual-sort');

	function setView() {
		todo.controller.setView(document.location.hash);
	}
  window.addEventListener('load', callback);
  window.addEventListener('updateState', callback);
})();

// should know about the existence of Models in order to observe them,
// but don’t directly communicate with them.
// View's main tasks are to render provided HTML template
// with corrected data from the model.

// 6,2,8,4,11,30,1,99,5

const button = document.querySelector(".button");
const inputNumbers = document.querySelector(".inputNumbers");
const content = document.querySelector(".content");


function numberSubmit(event) {
  event.preventDefault();
  // number - model에 보내서 validate
  const result = dataModel.getData(inputNumbers.value);
  newTemplate(result);
  controller.getState(result);
}

// bubble 시작


// 변화가 일어나면 view render
function displayNumbers(data) {
  return new Promise(resolve => {
    setTimeout(() => resolve(newTemplate(data)), 1500);
  });
}

function newTemplate(data) {
  content.innerHTML = `<div class="content">
    <input type="text" name="numbers" class="inputNumbers">
    <input type="button" value="send" class="button">
    ​<h3>${data}</h3>
    <h1>Visualize Sorting Algorithms</h1>
    <p>README.md를 읽어보고 과제를 시작하세요.</p>
    </div>`;
}


button.addEventListener('click', numberSubmit);

