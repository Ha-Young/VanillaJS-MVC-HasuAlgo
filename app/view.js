import {$on, qs, $delegate} from './helpers';
import { SortItemList } from './typeDef';

export default class View {
	constructor(template) {
		console.log('View Constructor!');

		this.template = template;
		this.$container = qs('.container');
		this.$themeSwitch = qs('#theme-switch');
		this.$sortKindsBtns = qs('.sort-kinds-btns');
		this.$inputNumbers = qs('.input-numbers');
		this.$setBtn = qs('.set-btn');
		this.$vizCanvas = qs('#viz-canvas');
		this.$sortBtn = qs('.sort-btn');
	}

	bindOnClickSortKindsBtns(handler) {
		$on(this.$sortKindsBtns, 'click', ({currentTarget, target}) => {
			target.classList.add('selected');
			for (const childNode of currentTarget.childNodes) {
				if (childNode !== target) {
					childNode.classList && childNode.classList.remove('selected');
				}
			}

			handler(target.dataset.btnName);
		});
	}

	bindOnClickSetBtn(handler) {
		$on(this.$setBtn, 'click', () => {
			handler(this.$inputNumbers.value);
		});
	}

	bindOnClickThemeSwitch(handler) {
		$on(this.$themeSwitch, 'change', () => {
			handler();
		});
	}

	bindOnClickSortBtns(handler) {
		$on(this.$sortBtn, 'click', () => {
			handler();
		});
	}

	setTheme(theme) {
		this.$container.className = `container ${theme}`;
	}

	getItemListsOnView() {
		return this.$vizCanvas.querySelectorAll('g');
	}

	/**
	 * Format the contents of a sort list.
	 *
	 * @param {SortItemList} items sort list items
	 *
	 */
	showSortItems(sortItemList) {
		this.$vizCanvas.innerHTML = this.template.sortItemList(sortItemList);
	}

	setItemSortedColor(index) {
		const sortItemElement = this.getItemListsOnView()[index];
		sortItemElement.removeAttribute('class');
		sortItemElement.classList.add('sorted');
	}

	setItemSelection(index) {
		const sortItemElement = this.getItemListsOnView()[index];
		sortItemElement.removeAttribute('class');
		sortItemElement.classList.add('selected');

		// Getting
		var xforms = sortItemElement.transform.baseVal.getItem(0); // An SVGTransformList
		
		var firstX = xforms.matrix.e, firstY = xforms.matrix.f;
		
		var from     = firstY;  // x="10"
		var to       = firstY + 200;  // x="70"
		var duration = 1000; // 500ms
	
		var start = new Date().getTime();
	 
		var timer = setInterval(function() {
			var time = new Date().getTime() - start;
			var x = easeInOutQuart(time, from, to - from, duration);
			sortItemElement.setAttribute('x', x);
			sortItemElement.setAttribute('transform', `translate(${firstX}, ${x})`);
			if (time >= duration) clearInterval(timer);
		}, 1000 / 60);
	}

	setItemCheckColor(index) {
		const sortItemElement = this.getItemListsOnView()[index];
		sortItemElement.removeAttribute('class');
		sortItemElement.classList.add('check');
	}
}

//
// http://easings.net/#easeInOutQuart
//  t: current time
//  b: beginning value
//  c: change in value
//  d: duration
//
function easeInOutQuart(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}