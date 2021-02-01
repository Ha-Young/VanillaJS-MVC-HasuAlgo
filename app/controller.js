(function (window) {
  'use strict';

  /**
	 * Takes a model and view and acts as the controller between them
	 *
	 * @constructor
	 * @param {object} model The model instance
	 * @param {object} view The view instance
	 */
	function Controller(model, view) {
		var self = this;
		self.model = model;
		self.view = view;

		self.view.bind('inputNumbers', function (title) {
			self.addList(title);
		});
  }

  Controller.prototype.addList = function (currentState) {

  }


	// Export to window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);

const state = {};
const content = document.querySelector(".content");

function Controller() {
  this.getState = function (data) {
    state['bubble'] = data;

    return this.sortStart(state['bubble']);
  }

  this.updateState = function (data) {
    return data;
  }

  this.sortStart = function () {
    after1second();

    this.bubble(state['bubble']);
  }

  this.bubble = async function (numList) {
    let isSwitched = false;

    for (let i = 1; i < numList.length; i++) {
      if (numList[i - 1] > numList[i]) {
        isSwitched = true;
        [numList[i - 1], numList[i]] = [numList[i], numList[i - 1]];

        // index.js로 내보내기
        this.updateState
        await after1second();
      }
    }

    if (isSwitched) {
      isSwitched = false;
      this.bubble(numList);
      await after1second();
    }

    newTemplate(numList);
    await after1second();
  }
}

function after1second() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });
}



const controller = new Controller();
export default controller;
