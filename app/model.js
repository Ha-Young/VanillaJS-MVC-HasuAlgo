function Model() {
	this.storage = {};
	// get

	// find

	// remove

	// update

	// getCount

}

Model.prototype.saveModel = function (type, list) {
	this.storage[type] = { type, list };
};

export default Model;
