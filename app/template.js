export const Template = function () {
  this.defaultTemplate = `<h1 class="main-message">Choose Sort Style</h1>`;

  this.bubbleTemplate = `<section class="sort-buttons">
    <div class="sort-options">
      <button class="shuffle-button option-button">SHUFFLE</button>
      <button class="random-button option-button">SET RANDOM</button>
    </div>
    <div class="sort-operation">
      <button class="reset-button operation-button hide">RESET</button>
      <button class="start-button operation-button">START</button>
    </div>
  </section>
  <ul class="sort-list"></ul>`;
  this.insertionTemplate = `<h1 class="main-alert">Insert coming soon</h1>
  <h2 class="sub-alert">How about Bubble Sort?</h2>`;
  this.mergeTemplate = `<h1 class="main-alert">Merge coming soon</h1>
  <h2 class="sub-alert">How about Bubble Sort?</h2>`;
  this.quickTemplate = `<h1 class="main-alert">Quick coming soon</h1>
  <h2 class="sub-alert">How about Bubble Sort?</h2>`;
};
