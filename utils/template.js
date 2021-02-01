export default class Template {
  /**
   * Format the contents of a todo list.
   *
   * @param {ItemList} items Object containing keys you want to find in the template to replace.
   * @returns {!string} Contents for a todo list
   *
   * @example
   * view.show({
   *	id: 1,
   *	title: "Hello World",
   *	completed: false,
   * })
   */
  generateNumberBlocks(numberArray, maxNum) {
    return numberArray.reduce((a, number) => a +
      `<div class="number-block" id="${number}" style = "height: ${(100 / maxNum)*number}vh;">${number}</div>`, "");
  }
}