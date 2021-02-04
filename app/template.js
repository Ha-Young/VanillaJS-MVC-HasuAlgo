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

  this.insertionTemplate = `<section class="sort-buttons">
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

  this.mergeTemplate = `<section class="sort-buttons">
  <div class="sort-options">
    <button class="shuffle-button option-button">SHUFFLE</button>
    <button class="random-button option-button">SET RANDOM</button>
  </div>
  <div class="sort-operation">
    <button class="reset-button operation-button hide">RESET</button>
    <button class="start-button operation-button">START</button>
  </div>
</section>
<div class="merge-container">
  <ul class="sort-list sort-list-merge merge-first">
    <li class="sort-element-merge merge-wait">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge merge-wait">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge merge-wait">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge merge-wait">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge merge-wait">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge merge-wait">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge merge-wait">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge merge-wait">
      <span class="sort-number-merge"></span>
    </li>
  </ul>
  <ul class="sort-list sort-list-merge merge-second">
    <li class="sort-element-merge">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge split">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge">
      <span class="sort-number-merge"></span>
    </li>
  </ul>
  <ul class="sort-list sort-list-merge merge-third">
    <li class="sort-element-merge">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge split">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge split">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge split">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge split">
      <span class="sort-number-merge"></span>
    </li>
  </ul>
  <ul class="sort-list sort-list-merge merge-forth">
    <li class="sort-element-merge split">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge split">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge split">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge split">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge split">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge split">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge split">
      <span class="sort-number-merge"></span>
    </li>
    <li class="sort-element-merge">
      <span class="sort-number-merge"></span>
    </li>
  </ul>
</div>`;

  this.quickTemplate = `<section class="sort-buttons">
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
};
