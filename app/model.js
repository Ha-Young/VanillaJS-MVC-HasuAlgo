// 데이터의 모양, 제약, 저장

// observing them about their current state
function Model() {
	const storage = {};

	this.makeNumber = function (list) {
		return list.trim().split(',')
			.map(elem => parseInt(elem, 10));
	}

  this.checkValidation = function (list) {
		checkValidation(list);
	};

	this.saveModel = function (type, list) {
		storage[type] = {type, list};
		return storage[type];
	};
}

function checkValidation(list) {
	if (!list.every(elem => !!elem === true)) {
		throw Error('Insert Numbers...');
	} else if (list.length < 5) {
		throw Error('Need at least 5 numbers...');
	} else if (list.length > 10) {
		throw Error('Need at most 10 numbers...');
	}
}

export default Model;