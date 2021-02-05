//import a from "../assets/images/chicken.jpg"
export default function View() {
  const $template = document.createAttribute('template');
  const $root = document.querySelector('.root');

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
  if (target === '.play-button') {
    document.querySelector(target).addEventListener(event, handler);
  }
}

View.prototype.sendDataToController = function (target, property) {
  return document.querySelector(target)[property];
}

View.prototype.initialRender = function (data) {
  const manipulatedData = data.manipulatedData;
  const $animationBox = document.querySelector('.animation-box');
  const maxData = Math.max(...manipulatedData);
  const animationBoxHeight = $animationBox.style.height;
  const oldNodeNumbers = $animationBox.children.length;

  for (let i = 0; i < oldNodeNumbers; i++) {
    $animationBox.children[0].remove();
  }

  for (let i = 0; i < manipulatedData.length; i++) {
    $animationBox.appendChild(document.createElement('div'));
    $animationBox.children[i].textContent = manipulatedData[i];
    $animationBox.children[i].style.height = `${200 * manipulatedData[i] / maxData}px`;
  }

  $animationBox.classList.add('play');
}

View.prototype.render = function (sortData) {
  const $animationBox = document.querySelector('.animation-box');
  const $statusBox = document.querySelector('.status-box');
  //console.log(sortData)
  const maxData = Math.max(...sortData.data);
  const animationBoxHeight = $animationBox.style.height;
  let ordinalNumberSuffix;
  const dataLength = sortData.data.length;

  switch (sortData.sortCount % 10) {
    case 1:
      ordinalNumberSuffix = 'st';
      break;
    case 2:
      ordinalNumberSuffix = 'nd';
      break;
    case 3:
      ordinalNumberSuffix = 'rd';
      break;
    default:
      ordinalNumberSuffix = 'th';
  }

  const changedElements = [];
  changedElements.push({leftElement: sortData.leftElement, rightElement: sortData.rightElement});

  const $playElements = document.querySelectorAll('.play');
  [].forEach.call($playElements, item => item.classList.remove('play'))
  const $pivotElement = document.querySelectorAll('.pivot');
  [].forEach.call($pivotElement, item => item.classList.remove('pivot'))
  //$animationBox.children[(sortData.leftElement + dataLength - 1) % dataLength].classList.remove('play');
  $animationBox.children[sortData.leftElement].classList.add('play');
  $animationBox.children[sortData.leftElement].textContent = sortData.data[sortData.leftElement];
  $animationBox.children[sortData.leftElement].style.height = `${200 * sortData.data[sortData.leftElement] / maxData}px`;
  $animationBox.children[sortData.rightElement % dataLength].classList.add('play');
  $animationBox.children[sortData.rightElement % dataLength].textContent = sortData.data[(sortData.rightElement) % dataLength];
  $animationBox.children[sortData.rightElement % dataLength].style.height = `${200 * sortData.data[(sortData.rightElement) % dataLength] / maxData}px`;
  $animationBox.children[sortData.pivotIndex].classList.add('pivot');

  $statusBox.textContent = `Searching ${sortData.sortCount}${ordinalNumberSuffix}`;

  return;
}
