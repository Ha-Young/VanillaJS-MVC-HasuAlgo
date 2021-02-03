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
		this.view.setItemSortedColor(index, this.delayTimeOnChange);
	}

	viewItemSelection(index) {
		this.view.setItemSelection(index, this.delayTimeOnChange);
	}

	viewItemCheckColor(index) {
		this.view.setItemCheckColor(index);
	}

	async insertionSort(sortList) {
		await this.doUIWork([this.viewItemSortedColor.bind(this, 0)]);

		for (let i = 1; i < sortList.length; i++) {
			let selectionIndex = i;
			await this.doUIWork([this.viewItemSelection.bind(this, selectionIndex)]);

			let checkIndex = selectionIndex - 1;

			while (checkIndex >= 0) {
				await this.doUIWork([this.viewItemCheckColor.bind(this, checkIndex)]);

				if (sortList[checkIndex] > sortList[selectionIndex]) {
					// change
					let temp = sortList[checkIndex];
					sortList[checkIndex] = sortList[selectionIndex];
					sortList[selectionIndex] = temp;
					checkIndex--;
					selectionIndex--;
				} else {
					await this.doUIWork(
						[
							this.viewItemSortedColor.bind(this, checkIndex),
							this.viewItemSortedColor.bind(this, selectionIndex),
						]);
					break;
				}
				
				//await this.setNumsView(sortList, this.delayTimeOnChange);
			}
		}

		console.log(sortList);
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
