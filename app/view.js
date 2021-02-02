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
		const gTagCollection = this.getItemListsOnView();
		gTagCollection[index].removeAttribute('class');
		gTagCollection[index].classList.add('sorted');
	}

	setItemSelection(index) {
		const gTagCollection = this.getItemListsOnView();
		gTagCollection[index].removeAttribute('class');
		gTagCollection[index].classList.add('selected');

		console.log(gTagCollection[index].attributes);

		// Getting
		var xforms = gTagCollection[index].transform.baseVal; // An SVGTransformList
		var firstXForm = xforms.getItem(0);       // An SVGTransform
		if (firstXForm.type == SVGTransform.SVG_TRANSFORM_TRANSLATE){
			var firstX = firstXForm.matrix.e,
					firstY = firstXForm.matrix.f;
		}

		// Setting
		gTagCollection[index].transform.baseVal.getItem(0).setTranslate(`${firstX}`,`${firstY + 200}`);
		// console.log(gTagCollection[index]);
		// console.log(gTagCollection[index].style);
	}
}
