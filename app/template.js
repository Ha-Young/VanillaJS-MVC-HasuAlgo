export const Template = function () {
  this.dafaultTemplate =
    '<li data-id="{{id}}" class="{{completed}}">' +
    '<div class="view">' +
    '<input class="toggle" type="checkbox" {{checked}}>' +
    "<label>{{title}}</label>" +
    '<button class="destroy"></button>';
  "</div>" + "</li>";
};

Template.prototype.test = function () {
  console.log("test in view success");
};
