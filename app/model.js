export default function Model () {
  const _storage = {};

  Model.prototype.refineNums = function (nums) {
    const inputtedNums = nums
      .replace(/ /g, "")
      .split(",")
      .map((numString) => parseInt(numString, 10))
      .filter((num) => num);

    if (inputtedNums.length < 5 || inputtedNums.length > 10) {
      return {
        isComplete: false,
        message: "Please enter 5 to 10 numbers.",
      };
    }

    if (!inputtedNums.every((num, i) => num < 1000)) {
      return {
        isComplete: false,
        message: "Please input numbers less than 1000",
      };
    }

    const tempNums = Array.from(inputtedNums);
    const sortedNumsIndex = [
      ...new Set(
        tempNums.sort(
          (a, b) => a - b
        )
      )
    ].reduce((numsIndex, num, i) => {
      numsIndex[num] = i;
      return numsIndex;
    }, {});

    const max = Math.max(...inputtedNums);

    const resultValue = inputtedNums.map((num, i) => ({
        num,
        max,
        sortedIndex: sortedNumsIndex[num],
        percentage: Math.round(num / max * 100),
      })
    );

    return {
      isComplete: true,
      value: resultValue
    };
  };

  Model.prototype.swapItems = function (arr, aIndex, bIndex) {
    [arr[aIndex], arr[bIndex]] = [arr[bIndex], arr[aIndex]];
  };

  Model.prototype.makeBubbleSortSteps = function (inputtedNums) {
    const sortSteps = [];

    for (let i = 0; i < inputtedNums.length - 1; i++) {
      for (let j = 0; j < inputtedNums.length - 1 - i; j++) {

        const a = inputtedNums[j];
        const b = inputtedNums[j + 1];

        if (a > b) {
          const before = Array.from(inputtedNums);
          const after = Array.from(inputtedNums);
          this.swapItems(after, j, j + 1);
          this.swapItems(inputtedNums, j, j + 1);

          sortSteps.push({
            shouldSwap: true,
            a: a,
            b: b,
            indexA: j,
            indexB: j + 1,
            beforeSwap: JSON.stringify(before),
            afterSwap: JSON.stringify(after),
          });
        }
        else {
          sortSteps.push({
            shouldSwap: false,
            a: a,
            b: b,
            indexA: j,
            indexB: j + 1,
          });
        }
      }
    }

    return sortSteps;
  };

  Model.prototype.getIndexForQuickSort = function (inputtedNums, start, end) {
    const sortSteps = [];
    const pivotIndex = end;
    const pivotValue = inputtedNums[pivotIndex];

    let nextPivotIndex = start;
    let currentIndex = start;

    while (currentIndex < end) {
      const shouldSwap = inputtedNums[currentIndex] < pivotValue;

      const before = Array.from(inputtedNums);
      const after = Array.from(inputtedNums);

      if (shouldSwap) {
        this.swapItems(inputtedNums, currentIndex, nextPivotIndex);
        this.swapItems(after, currentIndex, nextPivotIndex);
      }

      sortSteps.push(
        {
          start,
          end,
          pivotValue,
          pivotIndex,
          nextPivotIndex,
          currentIndex,
          nextPivotIndexValue: inputtedNums[nextPivotIndex],
          currentIndexValue: inputtedNums[currentIndex],
          shouldSwap,
          isEnd: false,
          beforeSwap: JSON.stringify(before),
          afterSwap: JSON.stringify(after),
        }
      )

      if (shouldSwap) {
        nextPivotIndex++;
      }

      currentIndex++;
    }

    const before = Array.from(inputtedNums);
    const after = Array.from(inputtedNums);
    this.swapItems(inputtedNums, pivotIndex, nextPivotIndex);
    this.swapItems(after, pivotIndex, nextPivotIndex);
    sortSteps.push(
      {
        start,
        end,
        pivotValue,
        pivotIndex,
        nextPivotIndex,
        currentIndex,
        nextPivotIndexValue: inputtedNums[nextPivotIndex],
        currentIndexValue: inputtedNums[currentIndex],
        shouldSwap: true,
        isEnd: true,
        beforeSwap: JSON.stringify(before),
        afterSwap: JSON.stringify(after),
      }
    );

    return [nextPivotIndex, sortSteps];
  }

//1,12,5,26, 7, 14,3,7,2
  Model.prototype.makeQuickSortSteps = function (inputtedNums, start = 0, end = inputtedNums.length - 1) {
    if (start >= end) {
      return [];
    }

    const [prevPivotIndex, sortSteps] = this.getIndexForQuickSort(inputtedNums, start, end);

    const leftArrSteps = this.makeQuickSortSteps(inputtedNums, start, prevPivotIndex - 1);
    const rightArrSteps = this.makeQuickSortSteps(inputtedNums, prevPivotIndex + 1, end);

    let resultSteps = [];
    resultSteps = resultSteps.concat(sortSteps, leftArrSteps, rightArrSteps);

    return resultSteps;
  };

  Model.prototype.set = function (key, value) {
    if (typeof key !== "string") {
      throw new Error("The key argument must be a string");
    }

    Object.assign(_storage, { [key]: value });
  };

  Model.prototype.get = function (key) {
    return _storage[key];
  };
}
