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

		view.bindOnClickSortKindsBtns();
	}

	startView() {

		this.model.initDatas();
	}
}
