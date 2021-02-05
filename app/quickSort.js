function quickSort (data, left, right) {
  const index = partition(data, left, right);

  if (index - 1 > left) {
    quickSort(data, left, index - 1);
  }

  if (index < right) {
    quickSort(data, index, right);
  }

  return data;
}

function partition (data, left, right) {
  let _left = left;
  let _right = right;
  const pivot = data[Math.floor((_left + _right) / 2)];

  while (_left <= _right) {
    let temp;

    if (_left + 1 >= _right) {
      _left = left;
      _right = right;
    }

    while (data[_left] < pivot) {
      _left++;
    }

    while (data[_right] > pivot) {
      _right--;
    }

    if (_left <= _right) {
      temp = data[_left];
      data[_left] = data[_right];
      data[_right] = temp;
      _left++;
      _right--;
    }
    console.log(left, right)
    console.log(data)
  }
  return _left;
}

quickSort([4, 3, 2, 1], 0, [4, 3, 2, 1].length - 1);