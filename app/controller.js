import Model from './model';
import View from './view';
import { SORT_KINDS } from './constant';

export default class Controller {
	/**
	 * @param  {!Model} model A Model instance
	 * @param  {!View} view A View instance
	 */
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.isReadySort = false;
		this.delayTimeOnChange = 500;

		view.bindOnClickSortKindsBtns(this.setSortKinds.bind(this));
		view.bindOnClickSetBtn(this.setInitNumsView.bind(this));
		view.bindOnClickThemeSwitch(this.toggleTheme.bind(this));
		view.bindOnClickSortBtns(this.startSort.bind(this));
	}

	setStartView() {
		this.view.setStartView();
	}

	setInitNumsView(inputData) {
		try {
			const sortList = this.model.initDatas(inputData);
			this.setNumsView(sortList);
      this.isReadySort = true;
		} catch(error) {
			window.alert(error);
		}
	}

	setNumsView(sortList) {
    const sortItemList = this.model.getSortItemList(sortList);
    this.view.showSortItems(sortItemList);
	}

	setSortKinds(sortKinds) {
		this.model.currentSortKinds = sortKinds;
	}

	toggleTheme() {
		const theme = this.model.toggleTheme();
		this.view.setTheme(theme);
	}

	swapOnRealList(sortList, aIndex, bIndex) {
		const temp = sortList[aIndex];
		sortList[aIndex] = sortList[bIndex];
		sortList[bIndex] = temp;
  }

  getPivotIndex(leftIndex, rightIndex, pivotKinds) {
    let pivotIndex = leftIndex;
    switch (pivotKinds) {
      case 'first':
        pivotIndex = leftIndex;
        break;
      case 'end':
        pivotIndex = rightIndex;
        break;
      case 'mid':
        pivotIndex = Math.floor((leftIndex + rightIndex) / 2);
    }

    return pivotIndex;
  }

	startSort() {
		if (this.isReadySort) {
			if (this.model.currentSortKinds === 'quick') {
        this.view.addArrowDefSVG();
			}

      this.sortFunction(this.model.currentSortKinds);
		}
	}

	sortFunction(sortKinds) {
		const sortList = [...this.model.sortList];
		let sortedListPromise;

		switch (sortKinds) {
			case SORT_KINDS.Insertion:
				sortedListPromise = this.insertionSort(sortList);
				break;

			case SORT_KINDS.Quick:
				sortedListPromise = this.quickSort(sortList);
				break;
		}

		sortedListPromise.then((sortedList) => {
			alert('sort 완료');
		});
	}

	doUIWork(uiWorkFunctions) {
		return new Promise((resolve) => {
			for (const uiWorkFunction of uiWorkFunctions) {
				uiWorkFunction();
			}

			setTimeout(() => {
				resolve();
			}, this.delayTimeOnChange);
		});
	}

	viewItemSortedColor(index) {
		this.view.setSortItemStatusSorted(index, this.delayTimeOnChange);
	}

	viewItemSelect(index, isMoveDown) {
		const delay = isMoveDown ? this.delayTimeOnChange : this.delayTimeOnChange / 3;
		this.view.setSortItemStatusSelected(index, isMoveDown, delay);
	}

	viewItemResetStatus(index) {
		this.view.setSortItemStatusClear(index);
  }

  viewItemResetStatusAll(sortedIndexs) {
		debugger;
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

  viewItemSmall(index) {
    this.view.setSortItemStatusSmall(index);
  }

  viewItemLarge(index) {
    this.view.setSortItemStatusLarge(index);
  }

  viewAddArrow(index, arrowKinds) {
    this.view.addArrow(index, arrowKinds);
  }

  viewRemoveArrow(arrowKinds) {
    this.view.removeArrow(arrowKinds);
  }

  viewArrowMoveNext(arrowKinds) {
    this.view.moveArrowNext(arrowKinds, this.delayTimeOnChange);
  }

	async insertionSort(sortList) {
		await this.doUIWork([this.viewItemSortedColor.bind(this, 0)]);

		for (let i = 1; i < sortList.length; i++) {
			let keyIndex = i;
			await this.doUIWork([this.viewItemSelect.bind(this, keyIndex, true)]);

			let checkIndex = keyIndex - 1;

			await this.doUIWork([this.viewItemCheckColor.bind(this, checkIndex)]);

			while (checkIndex >= 0) {
				if (sortList[checkIndex] > sortList[keyIndex]) {
					this.swapOnRealList(sortList, checkIndex, keyIndex);

					await this.doUIWork([this.viewItemChange.bind(this, checkIndex, keyIndex)]);

          this.view.swapOnDomList(checkIndex, keyIndex);

					checkIndex--;
					keyIndex--;

					if (checkIndex < 0) {
						await this.doUIWork(
							[
								this.viewItemSortedColor.bind(this, keyIndex + 1),
								this.viewItemSortedColor.bind(this, keyIndex),
							]
						);
						continue;
					}

					await this.doUIWork(
						[
							this.viewItemSortedColor.bind(this, keyIndex + 1),
							this.viewItemCheckColor.bind(this, checkIndex),
						]
          );

				} else {
					await this.doUIWork(
						[
							this.viewItemSortedColor.bind(this, checkIndex),
							this.viewItemSortedColor.bind(this, keyIndex),
						]);
					break;
				}
			}
		}

    return sortList;
	}

	async quickSort(sortList) {
    const sortedItemIndex = [];

		return await (async function _quickSort (sortList, leftIndex = 0, rightIndex = sortList.length - 1) {
			if (leftIndex >= rightIndex) {
        sortedItemIndex.push(leftIndex);

        await this.doUIWork([this.viewItemSortedColor.bind(this, leftIndex)]);
				return;
      }

			const pivotIndex = this.getPivotIndex(leftIndex, rightIndex, 'mid');
      // const pivot = sortList[midIndex];

      await this.doUIWork(
        [
          this.viewItemPivotColor.bind(this, pivotIndex),
          // this.viewAddArrow.bind(this, pivotIndex, 'pivot'),
        ]);

      const [partitionIndex, changePivotIndex] = await divide.call(this, sortList, leftIndex, rightIndex, pivotIndex);
			sortedItemIndex.push(changePivotIndex);

      await this.doUIWork(
        [
          this.viewItemSortedColor.bind(this, changePivotIndex),
          this.viewRemoveArrow.bind(this, 'left'),
          this.viewRemoveArrow.bind(this, 'right'),
        ]);

      await this.doUIWork([this.viewItemResetStatusAll.bind(this, sortedItemIndex)]);

			await _quickSort.call(this, sortList, leftIndex, partitionIndex - 1);
			await _quickSort.call(this, sortList, partitionIndex, rightIndex);

			async function divide (sortList, leftIndex, rightIndex, pivotIndex) {
        const pivot = sortList[pivotIndex];

        await this.doUIWork(
          [
            this.viewAddArrow.bind(this, leftIndex, 'left'),
            this.viewAddArrow.bind(this, rightIndex, 'right'),
          ]);

				while (leftIndex <= rightIndex) {
					while (sortList[leftIndex] < pivot) {
            if (leftIndex !== pivotIndex) {
              this.doUIWork([this.viewItemSmall.bind(this, leftIndex)]);
            }
            await this.doUIWork([this.viewArrowMoveNext.bind(this, 'left')]);
						leftIndex++;
					}

					if (leftIndex !== pivotIndex) {
						await this.doUIWork([this.viewItemSelect.bind(this, leftIndex, false)]);
					}

					while (sortList[rightIndex] > pivot) {
            if (rightIndex !== pivotIndex) {
              this.doUIWork([this.viewItemLarge.bind(this, rightIndex)]);
            }
            await this.doUIWork([this.viewArrowMoveNext.bind(this, 'right')]);
						rightIndex--;
					}

					if (leftIndex !== pivotIndex) {
						await this.doUIWork([this.viewItemSelect.bind(this, rightIndex, false)]);
					}

					if (leftIndex === rightIndex) {
						leftIndex++;
						rightIndex--;
					}

					if (leftIndex < rightIndex) {
            if (leftIndex === pivotIndex) {
              pivotIndex = rightIndex;
            } else if (rightIndex === pivotIndex) {
              pivotIndex = leftIndex;
            }

            this.swapOnRealList(sortList, leftIndex, rightIndex);

            await this.doUIWork(
							[
								this.viewItemResetStatus.bind(this, leftIndex),
								this.viewItemResetStatus.bind(this, rightIndex),
								this.viewItemChange.bind(this, leftIndex, rightIndex),
							]);

            this.view.swapOnDomList(leftIndex, rightIndex);

						leftIndex++;
						rightIndex--;

						if (leftIndex >= rightIndex) continue;

						await this.doUIWork(
							[
								this.viewArrowMoveNext.bind(this, 'left'),
								this.viewArrowMoveNext.bind(this, 'right')
							]);
					}
        }
				return [leftIndex, pivotIndex];
      }

			return sortList;
		}).bind(this)(sortList);
	}
}
