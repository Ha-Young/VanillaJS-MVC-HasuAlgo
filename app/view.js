(function (window) {
  'use strict';

  function View(template) {
		this.template = template;

		this.ENTER_KEY = 13;
    this.ESCAPE_KEY = 27;

    this.$content = document.querySelector(".content h3");
    this.$inputNumber = document.querySelector(".inputNumber");
  }

  View.prototype.bind = function (event, handler) {
		var self = this;
		if (event === 'newTodo') {
			$on(self.$newTodo, 'change', function () {
				handler(self.$newTodo.value);
			});

		}
	};

  // Export to window
	window.app = window.app || {};
	window.app.View = View;
})(window);

const result = document.querySelector(".content h3");
const content = document.querySelector(".content");


function View(template) {
  this.template = template;
  this.render = function(data) {
    content.innerHTML = `<div class="content">
    <input type="text" name="numbers" class="inputNumbers">
    <input type="button" value="send" class="button">
    ​<h3>${data}</h3>
    <h1>Visualize Sorting Algorithms</h1>
    <p>README.md를 읽어보고 과제를 시작하세요.</p>
    </div>`;
  }

  return this;
}

function Template(data) {
  this.defaultTemplate
  =	`<div class="content">
  <input type="text" name="numbers" class="inputNumbers">
  <input type="button" value="send" class="button">
  ​<h3>${data}</h3>
  <h1>Visualize Sorting Algorithms</h1>
  <p>README.md를 읽어보고 과제를 시작하세요.</p>
  </div>`;
}


const view = new View();
export default view;
