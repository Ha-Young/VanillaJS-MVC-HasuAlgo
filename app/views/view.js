export const BubbleView = function(template) {
  this.template = template;
  this.$visualBox = document.querySelector('.visual');
  this.$form = document.querySelector('form');
  this.$userValue = document.querySelector('.user-choose');
  this.$SubmitBtn = document.querySelector('.submit-button');
}

BubbleView.prototype.setInit = function(input) {
}

BubbleView.setInit;