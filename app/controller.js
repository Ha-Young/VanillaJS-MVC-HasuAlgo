import Model from './model';
import View from './view';


export default class Controller {
	/**
	 * @param  {!Model} model A Model instance
	 * @param  {!View} view A View instance
	 */
	constructor(model, view) {
		console.log('Controller Constructor!');
		this.model = model;
		this.view = view;

		view.bindOnClickSortKindsBtns(this.setSortKinds.bind(this));
		view.bindOnClickStartBtn(this.startView.bind(this));
		view.bindOnClickThemeSwitch(this.toggleTheme.bind(this));
	}

	startView(inputData) {
		try {
			this.model.initDatas(inputData);
			const sortItemList = this.model.getSortItemList();

			this.view.showSortItems(sortItemList);
		} catch(error) {
			window.alert(error);
		}

	}

	setSortKinds(sortKinds) {
		this.model.currentSortKinds = sortKinds;
	}

	toggleTheme() {
		const theme = this.model.toggleTheme();
		this.view.setTheme(theme);
	}
}
