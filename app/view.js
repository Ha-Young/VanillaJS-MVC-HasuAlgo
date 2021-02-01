import {$on, qs, $delegate} from './helpers';

export default class View {
	constructor() {
		console.log('View Constructor!');

		this.$themeSwitch = qs('.theme-switch');
		this.$sortKindsBtns = qs('.sort-kinds-btns');
		this.$inputNumbers = qs('.input-numbers');
		this.$startBtn = qs('.start-btn');
		this.$visualList = qs('.visual-list');


	}

	bindOnClickSortKindsBtns(handler) {
		$on(this.$sortKindsBtns, 'click', ({currentTarget, target}) => {
			console.log('currentTarget', currentTarget);
			console.log('target', target);
		});
	}
}
