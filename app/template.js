export const Template = function () {
  this.default = `<h1 class="main-message">Choose Sort Style</h1>`;

  this.bubble = `<section class="sort-buttons">
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

  this.insertion = `<section class="sort-buttons">
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

  this.merge = `<h1 class="main-alert">Merge coming soon</h1>
  <h2 class="sub-alert">How about Bubble Sort?</h2>`;

  this.quick = `<h1 class="main-alert">Quick coming soon</h1>
  <h2 class="sub-alert">How about Bubble Sort?</h2>`;
};
