import { SortItemList } from './typeDef';

export default class Templates {

  /**
	 * Format the contents of a sort list.
	 *
	 * @param {SortItemList} items sort list items
	 * @returns {!string} Contents for a sort list
	 *
	 */
  sortItemList(sortItems) {
    return sortItems.reduce((acc, item) => acc + `
    <g transform="translate(${item.position.x}, ${item.position.y})">
      <rect
        height="${item.rect.height}"
        width="${item.rect.width}"
      ></rect>
      <text dy="${item.text.size}" x="${item.text.x}" y="${item.text.y}">${item.value}</text>
    </g>
    `, '');
  }
}
