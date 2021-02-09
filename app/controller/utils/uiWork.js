import { UiTaskSet, StatusTask, SwapTask, ArrowTask, ResetTask } from '../../common/typeDef';
import 
{
  STATUS_TYPE,
  UI_WORK_TYPE,
  ARROW_COMMEND,
  RESET_TYPE,
} from "../../common/constant";

export default class uiWork {
  constructor(controller) {
    this.controller = controller;
    this.model = this.controller.model;
    this.view = this.controller.view;
    this.delayTimeOnChange = this.controller.delayTimeOnChange;
  }

  async doUITaskProcess() {
    while (this.model.uiTaskQueue.checkTask()) {
      const uiTaskSet = this.model.uiTaskQueue.dequeue();

      await this.doUIWork(uiTaskSet);
    }
  }

  /**
   *
   * @param {UiTaskSet} uiTaskSet
   */
  async doUIWork(uiTaskSet) {
    return new Promise((resolve) => {
      this.doUIWorkOnTaskSet(uiTaskSet);

      setTimeout(resolve, this.delayTimeOnChange);
    });
  }

  /**
   *
   * @param {UiTaskSet} uiTaskSet
   */
  doUIWorkOnTaskSet(uiTaskSet) {
    for (const uiTask of uiTaskSet) {
      switch (uiTask.type) {
        case UI_WORK_TYPE.STATUS:
          this.doUIStatusWork(uiTask.value);
          break;
        case UI_WORK_TYPE.SWAP:
          this.doUISwapWork(uiTask.value);
          break;
        case UI_WORK_TYPE.ARROW:
          this.doUIArrowWork(uiTask.value);
          break;
        case UI_WORK_TYPE.RESET:
          this.doUIResetWork(uiTask.value);
          break;
        default:
          console.log(uiTask);
          throw new Error('정의되지 않은 uiTask Type');
      }
    }
  }

  /**
   * @param {StatusTask} statusTask
   */
  doUIStatusWork(statusTask) {
    const { type, index: targetIndex, moveOption } = statusTask;

    switch (type) {
      case STATUS_TYPE.SORTED:
        this.viewItemSortedColor(targetIndex);
        break;
      case STATUS_TYPE.SELECTED:
        this.viewItemSelect(targetIndex, moveOption);
        break;
      case STATUS_TYPE.CHECK:
        this.viewItemCheckColor(targetIndex);
        break;
      case STATUS_TYPE.SMALL:
        this.viewItemSmallColor(targetIndex);
        break;
      case STATUS_TYPE.LARGE:
        this.viewItemLargeColor(targetIndex);
        break;
      case STATUS_TYPE.PIVOT:
        this.viewItemPivotColor(targetIndex);
        break;
      default:
        throw new Error('정의되지 않은 statusTask Type');
    }
  }

  /**
   *
   * @param {SwapTask} swapTask
   */
  doUISwapWork(swapTask) {
    const { fromIndex, toIndex } = swapTask;

    this.viewItemChange(fromIndex, toIndex);
    this.view.swapOnDomList(fromIndex, toIndex);
  }

  /**
   *
   * @param {ArrowTask} arrowTask
   */
  doUIArrowWork(arrowTask) {
    const { commend, type, index } = arrowTask;

    switch(commend) {
      case ARROW_COMMEND.ADD:
        this.viewAddArrow(index, type);
        break;
      case ARROW_COMMEND.MOVE:
        this.viewArrowMoveNext(type);
        break;
      case ARROW_COMMEND.REMOVE:
        this.viewRemoveArrow(type);
        break;
      default:
        throw new Error('정의되지 않은 Arrow Commend');
    }
  }

  /**
   * 
   * @param {ResetTask} resetTask 
   */
  doUIResetWork(resetTask) {
    const { type, index, exceptIndexList } = resetTask;

    switch(type) {
      case RESET_TYPE.ONE:
        this.viewItemResetStatus(index);
        break;
      case RESET_TYPE.ALL:
        this.viewItemResetStatusAll(exceptIndexList);
        break;
      default:
        throw new Error('정의되지 않은 Reset Type');
    }
  }

  viewItemSortedColor(index) {
    this.view.setSortItemStatusSorted(index, this.delayTimeOnChange);
  }

  viewItemSelect(index, isMoveDown) {
    const delay = isMoveDown
      ? this.delayTimeOnChange
      : this.delayTimeOnChange / 3;
    this.view.setSortItemStatusSelected(index, isMoveDown, delay);
  }

  viewItemResetStatus(index) {
    this.view.setSortItemStatusClear(index);
  }

  viewItemResetStatusAll(sortedIndexs) {
    this.view.setSortItemStatusClaerAllIgnoreSorted(sortedIndexs);
  }

  viewItemCheckColor(index) {
    this.view.setSortItemStatusCheck(index);
  }

  viewItemChange(fromIndex, toIndex) {
    this.view.changeSortItem(fromIndex, toIndex, this.delayTimeOnChange);
  }

  viewItemPivotColor(index) {
    this.view.setSortItemStatusPivot(index);
  }

  viewItemSmallColor(index) {
    this.view.setSortItemStatusSmall(index);
  }

  viewItemLargeColor(index) {
    this.view.setSortItemStatusLarge(index);
  }

  viewAddArrow(index, arrowType) {
    this.view.addArrow(index, arrowType);
  }

  viewRemoveArrow(arrowType) {
    this.view.removeArrow(arrowType);
  }

  viewArrowMoveNext(arrowType) {
    this.view.moveArrowNext(arrowType, this.delayTimeOnChange);
  }
}
