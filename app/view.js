export default function View() {
  const $template = document.createAttribute('template');
  const $root = document.querySelector('.root');

  $template.innerHTML = `
    <section class="container">
      <header class="title-box">Sort Alogrithm</header>
      <section class="control-box">
        <div>
          <input type="radio" name="sort-type"/><label>Bubble Sorting</label>
          <input type="radio" name="sort-type"/><label>Merged Sorting</label>
        </div>
        <button class="run-button">Run</button>
      </section>
      <section class="input-box">
        <input class="input-data" type="text" placeholder="Insert Data by the following format ---> [3 5 16 2 11 32]""/>
      </section>
      <main class="animation-box"></main>
    </section>
    `;

  $root.innerHTML = $template.innerHTML;
};

View.prototype.addControllerEvent = function (target, event, handler) {
  if (target === '.run-button') {
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

  $animationBox.classList.add('run');
}

View.prototype.render = function (data) {
  const $animationBox = document.querySelector('.animation-box');
  const maxData = Math.max(...data);
  const animationBoxHeight = $animationBox.style.height;
  for (let i = 0; i < data.length; i++) {
    $animationBox.children[i].textContent = data[i];
    $animationBox.children[i].style.height = `${200 * data[i] / maxData}px`;
  }
  
  //$animationBox.insertBefore($animationBox.children[1], $animationBox.children[0])

  $animationBox.classList.add('run');

  //insertBefore
  return;
}