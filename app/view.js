const header = document.querySelector("header");
const warningSpace = header.querySelector("p");
const section = document.querySelector("section");
const main = section.querySelector("main");

let alreadyCalled = false;
let positionValue;

export function showWarning () {
  warningSpace.textContent = `'최소 5개 ~ 최대 10개'의 숫자들을 입력해주세요.
                              ex) 5, 4, 3, 2, 1`;
}

export function paintDiv (input) {
  const div = document.createElement("div");
  div.textContent = input;
  div.style.height = `${50 + (input * 12)}px`;
  div.classList.add("item");
  main.appendChild(div);
  return div;
}

export function swapView(frontIndex, backIndex, domArray) {
   return new Promise(function (resolve) {
     setTimeout(function () {
      if (!alreadyCalled) {
        positionValue = domArray[backIndex].getBoundingClientRect().x - domArray[frontIndex].getBoundingClientRect().x
        alreadyCalled = true;
      }

      function getCurrentPositionValue (currentIndex, domArray) {
        const currentDomTransformString = domArray[currentIndex].style.transform
        let currentPosition;

        if (!currentDomTransformString) {
          currentPosition = 0;
        } else {
        const stringRemovedFront = currentDomTransformString.split("translateX(");
        const stringRemovedBack = stringRemovedFront[1].split("px)");
        currentPosition = parseInt(stringRemovedBack)
        }

        return currentPosition;
      }

      const currentFrontPositionValue = getCurrentPositionValue(frontIndex, domArray);
      const currentBackPositionValue = getCurrentPositionValue(backIndex, domArray);

      let temp = domArray[frontIndex]
      domArray[frontIndex] = domArray[backIndex];
      domArray[backIndex] = temp;

      domArray[backIndex].style.transform = `translateX(${currentFrontPositionValue + positionValue}px)`;
      domArray[frontIndex].style.transform = `translateX(${currentBackPositionValue - positionValue}px)`;

      resolve();
    }, 700);
  });
 }
