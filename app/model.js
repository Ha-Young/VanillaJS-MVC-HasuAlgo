function Model() {
	const taskQueue = [];

	this.createTask = function (type, sourceIndex, targetIndex, list) {
		taskQueue.push({
			type,
			sourceIndex,
			targetIndex,
			list
		});
	};

	this.findNextTask = function () {
		if (!taskQueue.length) return;

		return taskQueue.shift();
	};

}

export default Model;
