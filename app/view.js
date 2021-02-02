export default View
export {viewInstance}

const viewInstance = new View();

function View () {
this.$typed = document.querySelector(".typed");
this.$inputText = document.querySelector(".inputText");
this.$contentContainer = document.querySelector(".contentContainer");
this.$child = document.createElement('child');
}

View.prototype.addChildNode = function (value) {
  this.$child.innerHTML = value;
  this.$child.classList.add("graphNode");
  this.$child.style.height = value + 5 + 'px';

  this.$contentContainer.appendChild(this.$child);
} 
