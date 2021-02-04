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
      <g transform="translate(${item.position.x}, ${item.position.y})" class="sort-item">
        <rect
          height="${item.rect.height}"
          width="${item.rect.width}"
        ></rect>
        <text dy="${item.text.size}" x="${item.text.x}" y="${item.text.y}">${item.value}</text>
      </g>
      `, '');
  }

  arrowDef() {
    return (`
      <defs>
        <marker id="triangle-left" viewBox="0 0 10 10" refX="1" refY="5"
            markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <defs>
        <marker id="triangle-right" viewBox="0 0 10 10" refX="1" refY="5"
            markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
    `)
  }

  arrow(arrowKinds, xPos, yPos) {
    return (`
      <g transform="translate(${xPos}, ${yPos})" class="${arrowKinds}-arrow">
        <polyline points="10,20,10,0" fill="none"
          stroke-width="2" marker-end="url(#triangle-${arrowKinds})" />
        <text dy=".35em" x="10" y="30">left</text>
      </g>
    `)
  }
}
