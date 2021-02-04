export function initialTemplate() {
  return `
  <h1>Visualize Sorting Algorithms</h1>
  <form class="sorting__form">
    <input type="number" class="sorting__input">
  </form>
  <div class="sorting__queue"></div>
  <select required class="sorting__select-sort">
  <option id="Bubble">Bubble Sort</option>
    <option id="Merge">Merge Sort</option>
  </select>
  <div class="row">
    <button class="paint-button">Paint</button>
    <button class="sort-button">Sort</button>
  </div>
  <div class="display-container">
    <ul class="sorting__item-list"></ul>
  </div>
  <button class="reset-button">Reset</button>
`;
}