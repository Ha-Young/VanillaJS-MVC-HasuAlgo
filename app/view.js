//import a from "../assets/images/chicken.jpg"
export default function View() {
  const $root = document.querySelector('.root');
  const $template = document.createAttribute('template');

  $template.innerHTML = `
    <section class="container">
      <header class="title-box">
        Sort Algorithm
      </header>
      <section class="user-input-container">
        <section class="sort-select-box">
          <div>
            <input type="radio" name="sort-type" value="bubble-sort"/><label>Bubble Sort</label>
          </div>
          <div>
            <input type="radio" name="sort-type" value="quick-sort"/><label>Quick Sort</label>
          </div>
        </section>
        <input class="input-data-box" type="text" placeholder="Insert Data"/>
        <section class="control-box">
          <button class="play-button">Play</button>
          <button class="pause-button">Pause</button>
        </section>
      </section>
      <main class="animation-container">
        <section  class="status-box">
          Let's Sort!
        </section>
        <section class="animation-box">
        </section>
      </main>
    </section>
    `;

  $root.innerHTML = $template.innerHTML;
};

View.prototype.addControllerEvent = function (target, event, handler) {
  document.querySelector(target).addEventListener(event, handler);
}

View.prototype.sendDataToController = function (target, property) {
  return document.querySelector(target)[property];
}

View.prototype.initialRender = function (data) {
  const $animationBox = document.querySelector('.animation-box');
  const oldNodeNumbers = $animationBox.children.length;
  const maxData = Math.max(...data);
  const animationBoxHeight = 200;

  for (let i = 0; i < oldNodeNumbers; i++) {
    $animationBox.children[0].remove();
  }

  for (let i = 0; i < data.length; i++) {
    $animationBox.appendChild(document.createElement('div'));
    $animationBox.children[i].textContent = data[i];
    $animationBox.children[i].style.height = `${animationBoxHeight * data[i] / maxData}px`;
  }
}

View.prototype.render = function (data) {
  const {sortData, leftElement, rightElement} = data;
  const $animationBox = document.querySelector('.animation-box');
  const $statusBox = document.querySelector('.status-box');
  const $playElements = document.querySelectorAll('.play');
  const $pivotElement = document.querySelectorAll('.pivot');
  const leftBar = $animationBox.children[leftElement % sortData.length];
  const rightBar = $animationBox.children[rightElement % sortData.length];
  const maxData = Math.max(...sortData);
  const animationBoxHeight = 200;

  [].forEach.call($playElements, item => item.classList.remove('play'));
  [].forEach.call($pivotElement, item => item.classList.remove('pivot'));
  leftBar.classList.add('play');
  leftBar.textContent = sortData[leftElement % sortData.length];
  leftBar.style.height = `${animationBoxHeight * sortData[leftElement % sortData.length] / maxData}px`;
  rightBar.classList.add('play');
  rightBar.textContent = sortData[(rightElement) % sortData.length];
  rightBar.style.height = `${animationBoxHeight * sortData[(rightElement) % sortData.length] / maxData}px`;
  $statusBox.textContent = 'Searching';

  try {
    $animationBox.children[data.pivotIndex].classList.add('pivot');
  } catch {
  }

  return;
}
