import { $on, qs, $delegate, qsAll, changeDOMOrder } from './helpers';
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



	// SortItem 관련 (SVG)

	getSortItemListsOnView() {
		return qsAll('g', this.$vizCanvas);
	}

	getSortItemElement(nth) {
		return this.getSortItemListsOnView()[nth];
	}

	getSortItemRectHeight(sortItemElement) {
		const rectElement = sortItemElement.querySelector('rect');
		return (+ rectElement.getAttribute('height'));
	}

	clearSortItemColor(sortItemElement) {
		sortItemElement.removeAttribute('class');
	}

	getSortItemPosition(sortItemElement) {
		const svgTransFormMatrix = sortItemElement.transform.baseVal.getItem(0).matrix; // An SVGTransformList
		return [svgTransFormMatrix.e, svgTransFormMatrix.f];
	}

	swapOnDomList(aIndex, bIndex) {
		// const sortItemList = this.getSortItemListsOnView();
		changeDOMOrder(this.$vizCanvas, aIndex, bIndex);
	}

	setSortItemColorFromStatus(sortItemElement, status) {
		this.clearSortItemColor(sortItemElement);
		switch (status) {
			case 'sorted':
				sortItemElement.classList.add('sorted');
				break;
			case 'selected':
				sortItemElement.classList.add('selected');
				break;
			case 'check':
				sortItemElement.classList.add('check');
				break;
		}
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

	// sort 비동기 관련
	setSortItemStatusSorted(index, duration) {
		if (index < 0) return;
		const sortItemElement = this.getSortItemElement(index);
		const sortItemRectHeight = this.getSortItemRectHeight(sortItemElement);
		this.setSortItemColorFromStatus(sortItemElement, 'sorted');

		const [currentXPos, currentYPos] = this.getSortItemPosition(sortItemElement);
		const fromPosition = positionFactory(currentXPos, currentYPos);
		const toPosition = positionFactory(currentXPos, ITEM.MAX_HEIGHT - sortItemRectHeight);

		fromToTranslatePosition(sortItemElement, fromPosition, toPosition, duration);
	}

	setSortItemStatusSelected(index, duration) {
		const sortItemElement = this.getSortItemElement(index);
		const sortItemRectHeight = this.getSortItemRectHeight(sortItemElement);
		this.setSortItemColorFromStatus(sortItemElement, 'selected');

		const [currentXPos, currentYPos] = this.getSortItemPosition(sortItemElement);
		const fromPosition = positionFactory(currentXPos, currentYPos);
		const toPosition = positionFactory(currentXPos, currentYPos + sortItemRectHeight);

		fromToTranslatePosition(sortItemElement, fromPosition, toPosition, duration);
	}

	setSortItemStatusCheck(index) {
		if (index < 0) return;
		const sortItemElement = this.getSortItemElement(index);
		this.setSortItemColorFromStatus(sortItemElement, 'check');
	}

	setSortItemStatusClear

	changeSortItem(aIndex, bIndex, duration) {
		const aSortItemElement = this.getSortItemElement(aIndex);
		const bSortItemElement = this.getSortItemElement(bIndex);

		const [aXPos, aYPos] = this.getSortItemPosition(aSortItemElement);
		const [bXPos, bYPos] = this.getSortItemPosition(bSortItemElement);

		const aFromPosition = positionFactory(aXPos, aYPos);
		const aToPosition = positionFactory(bXPos, aYPos);

		const bFromPosition = positionFactory(bXPos, bYPos);
		const bToPosition = positionFactory(aXPos, bYPos);

		fromToTranslatePosition(aSortItemElement, aFromPosition, aToPosition, duration);
		fromToTranslatePosition(bSortItemElement, bFromPosition, bToPosition, duration);
	}
}
