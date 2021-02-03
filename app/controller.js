import Model from './model';
import View from './view';
import { SORT_KINDS } from './constant';

export default class Controller {
	/**
	 * @param  {!Model} model A Model instance
	 * @param  {!View} view A View instance
	 */
	constructor(model, view) {
		console.log('Controller Constructor!');
		this.model = model;
		this.view = view;
		this.isReadySort = false;
		this.delayTimeOnChange = 1000;

		view.bindOnClickSortKindsBtns(this.setSortKinds.bind(this));
		view.bindOnClickSetBtn(this.setInitNumsView.bind(this));
		view.bindOnClickThemeSwitch(this.toggleTheme.bind(this));
		view.bindOnClickSortBtns(this.startSort.bind(this));
	}

	setInitNumsView(inputData) {
		try {
			const sortList = this.model.initDatas(inputData);
			this.setNumsView(sortList);
			this.isReadySort = true;
		} catch(error) {
			window.alert(error);
		}
	}

	setNumsView(sortList, delay = 0) {
		return new Promise((resolve) => {
			setTimeout(() => {
				const sortItemList = this.model.getSortItemList(sortList);
				this.view.showSortItems(sortItemList);
				resolve();
			}, delay);
		});
	}

	setSortKinds(sortKinds) {
		this.model.currentSortKinds = sortKinds;
	}

	toggleTheme() {
		const theme = this.model.toggleTheme();
		this.view.setTheme(theme);
	}

	swapOnRealList(sortList, aIndex, bIndex) {
		const sortedList = [...sortList];
		const temp = sortedList[aIndex];
		sortedList[aIndex] = sortedList[bIndex];
		sortedList[bIndex] = temp;
		return sortedList;
	}

	startSort() {
		if (this.isReadySort) {
      this.sortFunction(this.model.currentSortKinds);
		}
	}

	sortFunction(sortKinds) {
		const sortList = [...this.model.sortList];
		switch (sortKinds) {
			case SORT_KINDS.Insertion:
				this.insertionSort(sortList);
				break;

			case SORT_KINDS.Quick:

				break;
		}
	}

	doUIWork(uiWorkFunctions) {
		return new Promise((resolve) => {
			for (const uiWorkFunction of uiWorkFunctions) {
				uiWorkFunction();
			}

			setTimeout(() => {
				resolve();
			}, this.delayTimeOnChange);
		});
	}

	viewItemSortedColor(index) {
		this.view.setSortItemStatusSorted(index, this.delayTimeOnChange);
	}

	viewItemSelection(index) {
		this.view.setSortItemStatusSelected(index, this.delayTimeOnChange);
	}

	viewItemResetStatus(index) {
		this.view.clearSortItemColor(index);
	}

	viewItemCheckColor(index) {
		this.view.setSortItemStatusCheck(index);
	}

	viewItemChange(fromIndex, toIndex) {
		this.view.changeSortItem(fromIndex, toIndex, this.delayTimeOnChange);
	}

	async insertionSort(sortList) {
		await this.doUIWork([this.viewItemSortedColor.bind(this, 0)]);

		for (let i = 1; i < sortList.length; i++) {
			let keyIndex = i;
			await this.doUIWork([this.viewItemSelection.bind(this, keyIndex)]);

			let checkIndex = keyIndex - 1;

			await this.doUIWork([this.viewItemCheckColor.bind(this, checkIndex)]);

			while (checkIndex >= 0) {

				if (sortList[checkIndex] > sortList[keyIndex]) {
					sortList = this.swapOnRealList(sortList, checkIndex, keyIndex);

					await this.doUIWork([this.viewItemChange.bind(this, checkIndex, keyIndex)]);
					// debugger;
					this.view.swapOnDomList(checkIndex, keyIndex);

					checkIndex--;
					keyIndex--;

					if (checkIndex < 0) {
						await this.doUIWork(
							[
								this.viewItemSortedColor.bind(this, keyIndex + 1),
								this.viewItemSortedColor.bind(this, keyIndex),
							]
						);
						continue;
					}

					await this.doUIWork(
						[
							this.viewItemSortedColor.bind(this, keyIndex + 1),
							this.viewItemCheckColor.bind(this, checkIndex),
						]
					);

				} else {
					await this.doUIWork(
						[
							this.viewItemSortedColor.bind(this, checkIndex),
							this.viewItemSortedColor.bind(this, keyIndex),
						]);
					break;
				}

				//await this.setNumsView(sortList, this.delayTimeOnChange);
			}
		}

    return sortList;
	}

	// async insertionSort(sortList) {
	// 	let index;
	// 	for (let i = 0; i < sortList.length; i++) {
	// 		index = i;

	// 		while (sortList[index - 1] > sortList[index]) {
	// 			let temp = sortList[index - 1];
	// 			sortList[index - 1] = sortList[index];
	// 			sortList[index] = temp;
	// 			index--;
	// 			await this.setNumsView(sortList, this.delayTimeOnChange);
	// 		}
	// 	}

	// 	console.log(sortList);
  //   return sortList;
	// }
}
