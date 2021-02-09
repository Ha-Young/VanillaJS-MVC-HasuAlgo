/**
 * @typedef {!{x: number, y: number}}
 */
export var Position;

/**
 * @typedef {!{width: number, height: number}}
 */
export var Rect;

/**
 * @typedef {!{x: number, y: number, size: string}}
 */
export var Text;

/**
 * @typedef {!{position: Position, rect: Rect, text: Text, value: string}}
 */
export var SortItem;

/**
 * @typedef {!Array<SortItem>}
 */
export var SortItemList;

/**
 * @typedef {{type: 'sorted' | 'selected' | 'check' | 'pivot' | 'small' | 'large',
 *            index: number, moveOption: boolean}}
 */
export var StatusTask;

/**
 * @typedef {{aIndex: number, bIndex: number}}
 */
export var SwapTask;

/**
 * @typedef {{commend: 'add' | 'move' | 'remove',
 *            type: 'left' | 'right'}}
 */
export var ArrowTask;

/**
 * @typedef {{taskType: 'status' | 'swap' | 'arrow', value: StatusTask | SwapTask | ArrowTask}
 */
export var UITask;

/**
 * @typedef {!Array<UITask>}
 */
export var UITaskSet;

/**
 * @typedef {!Array<UITaskSet>}}
 */
export var UITaskQueueType;
