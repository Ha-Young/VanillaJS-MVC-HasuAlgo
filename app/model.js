export default function Model () {
  this._storage = {};
}

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
  const result = Array.from(arr);
  [result[aIndex], result[bIndex]] = [result[bIndex], result[aIndex]];

  return result;
};

Model.prototype.makeBubbleSortProcesses = function () {
  const inputtedNums = this.get("inputtedNums").map((num) => num.num);
  if (!inputtedNums) {
    throw new Error("There is no inputted Numbers.");
  }

  const sortSteps = [];

  for (let i = 0; i < inputtedNums.length - 1; i++) {
    for (let j = 0; j < inputtedNums.length - i; j++) {

      const a = inputtedNums[j];
      const b = inputtedNums[j + 1];

      if (a > b) {
        const before = Array.from(inputtedNums);
        const after = Array.from(inputtedNums);
        [after[j], after[j + 1]] = [after[j + 1], after[j]];
        [inputtedNums[j], inputtedNums[j + 1]] = [inputtedNums[j + 1], inputtedNums[j]];

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
      // else {
      //   sortSteps.push({
      //     shouldSwap: false,
      //     a: a,
      //     b: b,
      //     indexA: j,
      //     indexB: j + 1,
      //   });
      // }
    }
  }

  return sortSteps;
};

Model.prototype.set = function (key, value) {
  if (typeof key !== "string") {
    throw new Error("The key argument must be a string");
  }

  Object.assign(this._storage, { [key]: value });
};

Model.prototype.get = function (key) {
  return this._storage[key];
};
