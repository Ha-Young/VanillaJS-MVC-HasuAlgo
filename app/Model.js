
export default function Model() {
    this.userInput = [];
}

Model.prototype.getUserInput = function() {
    return this.userInput;
}

Model.prototype.setUserInput = function(givenUserInput) {
    this.userInput = givenUserInput;
}

// get dom element info?? -> div info