import { $on, qs, $delegate } from './helpers';
import { SortItemList } from './typeDef';
import { fromToTranslatePosition, positionFactory } from './animate';
import { ITEM } from './constant';

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

	setItemSortedColor(index, duration) {
		const sortItemElement = this.getItemListsOnView()[index];
		const rectElement = sortItemElement.querySelector('rect');
		const itemRectHeight = + rectElement.getAttribute('height');
		sortItemElement.removeAttribute('class');
		sortItemElement.classList.add('sorted');

		const [currentXPos, currentYPos] = this.getItemPosition(sortItemElement);
		const fromPosition = positionFactory(currentXPos, currentYPos);
		const toPosition = positionFactory(currentXPos, ITEM.MAX_HEIGHT - itemRectHeight);

		fromToTranslatePosition(sortItemElement, fromPosition, toPosition, duration);
	}

	setItemSelection(index, duration) {
		const sortItemElement = this.getItemListsOnView()[index];
		const rectElement = sortItemElement.querySelector('rect');
		const itemRectHeight = + rectElement.getAttribute('height');
		sortItemElement.removeAttribute('class');
		sortItemElement.classList.add('selected');

		const [currentXPos, currentYPos] = this.getItemPosition(sortItemElement);
		const fromPosition = positionFactory(currentXPos, currentYPos);
		const toPosition = positionFactory(currentXPos, currentYPos + itemRectHeight);

		fromToTranslatePosition(sortItemElement, fromPosition, toPosition, duration);
	}

	setItemCheckColor(index) {
		const sortItemElement = this.getItemListsOnView()[index];
		sortItemElement.removeAttribute('class');
		sortItemElement.classList.add('check');
	}

	getItemPosition(itemElement) {
		const itemMatrix = itemElement.transform.baseVal.getItem(0).matrix; // An SVGTransformList
		return [itemMatrix.e, itemMatrix.f];
	}
}
