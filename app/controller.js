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

	async insertionSort(sortList) {
		let index;
		for (let i = 0; i < sortList.length; i++) {
			index = i;
			while (sortList[index - 1] > sortList[index]) {
				let temp = sortList[index - 1];
				sortList[index - 1] = sortList[index];
				sortList[index] = temp;
				index--;
				await this.setNumsView(sortList, 1000);
			}
		}

		console.log(sortList);
    return sortList;
	}
}
