const header = document.querySelector("header");
const warningSpace = header.querySelector("p");
const section = document.querySelector("section");
const main = section.querySelector("main");

export function showWarning () {
  warningSpace.textContent = `'최소 5개 ~ 최대 10개'의 숫자들을 입력해주세요.
                              ex) 5, 4, 3, 2, 1`;
}

export function paintDiv (input) {
  const div = document.createElement("div");
  div.textContent = input;
  div.style.height = `${input * 30}px`;
  div.classList.add("item");
  main.appendChild(div);
}

export function swapView(j) {
   return new Promise(function (resolve) {
     setTimeout(function () {
      const elements = main.querySelectorAll(".item");

      main.insertBefore(elements[j + 1], elements[j]);

      resolve();
    }, 700);
  });
 }
