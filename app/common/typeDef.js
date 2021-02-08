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
 * @typedef {!{!index: number, !status: string, moveOption: boolean}}
 */
export var ItemStatusChange;

/**
 * @typedef {!{aIndex: number, bIndex: number}}
 */
export var SwapItemPosition;

/**
 * @typedef {{type: 'add' | 'move' | 'remove'}}
 */
export var ArrowTaskType;

/**
 * @typedef {!{taskType: UIStatus || ArrowTaskType}}
 */
export var UITask;

/**
 * @typedef {!Array<UITask>}}
 */
export var UITaskQueue;