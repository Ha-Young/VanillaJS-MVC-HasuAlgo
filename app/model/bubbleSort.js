// handle events/input
// model에게 알려줘 이벤트에 대해
// 컨트롤러가 model update 했을 때 view에게 바로 말하지 않는다
// view와 model의 관계에서 observing이 알아채는 것
// Controller는 모델 내에서 변경 이벤트에 대해 자신을 모델의 현재 상태로
// 업데이트 (다시 렌더링)하도록 뷰에 지시합니다.

// 사용자가 View와 상호 작용하면 적절한 요청이 생성되고이 요청은 컨트롤러에 의해 처리됩니다.
// 컨트롤러는 모델 데이터를 응답으로 사용하여 적절한 뷰를 렌더링합니다.
// let storage = [];

function BubbleSort() {
  this.sort = sort;

  return this;
}

let isSwitched = false;

function sort(numList) {
  for (let i = 1; i < numList.length; i++) {
    if (numList[i - 1] > numList[i]) {
      isSwitched = true;
      [numList[i - 1], numList[i]] = [numList[i], numList[i - 1]];
    }
  }

  if (isSwitched) {
    isSwitched = false;
    sort(numList);
  }

  return numList;
}


const Bubble = new BubbleSort();
export default Bubble;