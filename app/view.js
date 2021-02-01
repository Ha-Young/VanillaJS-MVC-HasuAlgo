import {$on, qs, $delegate} from './helpers';

export default class View {
	constructor() {
		console.log('View Constructor!');

		this.$container = qs('.container');
		this.$themeSwitch = qs('#theme-switch');
		this.$sortKindsBtns = qs('.sort-kinds-btns');
		this.$inputNumbers = qs('.input-numbers');
		this.$startBtn = qs('.start-btn');
		this.$visualList = qs('.visual-list');


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

	bindOnClickStartBtn(handler) {
		$on(this.$startBtn, 'click', () => {
			console.log('start btn clicked!');
			handler(this.$inputNumbers.value);
		});
	}

	bindOnClickThemeSwitch(handler) {
		$on(this.$themeSwitch, 'change', () => {
			handler();
		});
	}

	setTheme(theme) {
		this.$container.className = `container ${theme}`;
	}
}
