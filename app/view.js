import '../assets/styles/index.less';

function createView() {
  const message = document.querySelector(".message");
  const main = document.querySelector(".main");
  const userInput = document.querySelector(".user-input");

  return {
    showBlock: function (storage) {
      for (let i = 0; i < storage[0].length; i++) {
        const div = document.createElement("div");
        div.className = "block";
        div.style.backgroundColor = "white";
        div.style.height = `${storage[0][i] * 5}%`;
        div.style.transform = `translateX(${i * 10}%)`;
        div.textContent = storage[0][i];
        main.appendChild(div);
      }
    },

    removeEveryContent: function () {
      main.textContent = "";
    },

    showWarningMessage: function () {
      message.textContent = "숫자를 입력하세요";
      view.removeInputValue();
    },

    removeWarningMessage: function () {
      message.textContent = "";
    },

    removeInputValue: function () {
      userInput.value = "";
    },

    swap: function (prevNode, nextNode) {
      const main = document.querySelector(".main");

      return new Promise((resolve) => {
        const prevNodeStyle = window.getComputedStyle(prevNode);
        const nextNodeStyle = window.getComputedStyle(nextNode);

        const prevNodeTransform = prevNodeStyle.getPropertyValue("transform");
        const nextNodeTransform = nextNodeStyle.getPropertyValue("transform");

        prevNode.style.transform = nextNodeTransform;
        nextNode.style.transform = prevNodeTransform;

        window.requestAnimationFrame(function () {
          setTimeout(function () {
            main.insertBefore(nextNode, prevNode);
            resolve();
          }, 100);
        });
      });
    }
  }
}

const view = createView();

export {view};