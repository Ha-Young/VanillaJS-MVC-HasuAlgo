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
            <input type="radio" name="sort-type"/><label>Bubble Sorting</label>
          </div>
          <div>
            <input type="radio" name="sort-type"/><label>Merged Sorting</label>
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
  const $animationBox = document.querySelector('.animation-box');
  const maxData = Math.max(...data);
  const animationBoxHeight = $animationBox.style.height;
  const oldNodeNumbers = $animationBox.children.length;

  for (let i = 0; i < oldNodeNumbers; i++) {
    $animationBox.children[0].remove();
  }

  for (let i = 0; i < data.length; i++) {
    $animationBox.appendChild(document.createElement('div'));
    $animationBox.children[i].textContent = data[i];
    $animationBox.children[i].style.height = `${200 * data[i] / maxData}px`;
  }

  $animationBox.classList.add('play');
}

View.prototype.render = function (sortData) {
  const $animationBox = document.querySelector('.animation-box');
  const $statusBox = document.querySelector('.status-box');
  const maxData = Math.max(...sortData.data);
  const animationBoxHeight = $animationBox.style.height;
  let ordinalNumberSuffix;

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

  $animationBox.children[(sortData.i + 4) % sortData.data.length].classList.remove('play');
  $animationBox.children[sortData.i].classList.add('play');
  $animationBox.children[sortData.i].textContent = sortData.data[sortData.i];
  $animationBox.children[sortData.i].style.height = `${200 * sortData.data[sortData.i] / maxData}px`;
  $animationBox.children[(sortData.i + 1) % sortData.data.length].classList.add('play');
  $animationBox.children[(sortData.i + 1) % sortData.data.length].textContent = sortData.data[(sortData.i + 1) % sortData.data.length];
  $animationBox.children[(sortData.i + 1) % sortData.data.length].style.height = `${200 * sortData.data[(sortData.i + 1) % sortData.data.length] / maxData}px`;
  $statusBox.textContent = `Searching ${sortData.sortCount}${ordinalNumberSuffix}`;

  return;
}
