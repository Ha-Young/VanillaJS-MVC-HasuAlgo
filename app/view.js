export default function View() {
  this.$graphs = document.querySelector(".graphs");
  this.$messageContainer = document.querySelector(".message-container");
  this.$message = document.querySelector(".message");
  this.$motion = document.querySelector(".motion");
  this.$inputBox = document.querySelector(".input-box");
  this.$excuteButton = document.querySelector(".excute-button");
  this.$menuOptions = document.querySelector(".menu-options");
  this.$bubbleRadio = document.querySelector("#bubble");
  this.$quickRadio = document.querySelector("#quick");
  this.$graphContainer = document.querySelector(".graph-container");
}

View.prototype.paintMessage = function (message, motion, delay) {
  this.$message.textContent = message;
  this.$motion.textContent = motion;

  if (delay !== undefined) {
    setTimeout(() => this.$message.textContent = "", delay);
    setTimeout(() => this.$motion.textContent = "", delay);
  }
};

async function identity() {};
View.prototype.paintGraphs = async function (data, fixedIndices = [], wait = identity, DELAY) {
  const maxSize = Math.max(...data);

  this.$graphs.textContent = "";

  data.forEach((item, index) => {
    const newBlock = document.createElement("span");

    newBlock.dataset.index = index + 1;
    newBlock.style.setProperty("height", (item / maxSize) * 90 + "%");

    if (fixedIndices.includes(index) || fixedIndices === "DONE") {
      newBlock.classList.add("fixed");
    }

    this.$graphs.appendChild(newBlock);
  });

  await wait(DELAY);
};

View.prototype.showTarget = async function (left, right, wait = identity, DELAY) {
  this.$graphs.children[left].classList.add("target");
  this.$graphs.children[right].classList.add("target");

  await wait(DELAY);
};

View.prototype.swap = async function (left, right, wait = identity, DELAY) {
  const distance = right - left;

  this.$graphs.children[left].style.transform = `translateX(${distance * 30}px) rotate(0.5turn)`;
  this.$graphs.children[right].style.transform = `translateX(-${distance * 30}px) rotate(0.5turn)`;

  await wait(DELAY);
};

View.prototype.holdInput = function (sholdHold) {
  if (sholdHold) {
    this.$inputBox.disabled = true;
    this.$bubbleRadio.disabled = true;
    this.$quickRadio.disabled = true;
    this.$excuteButton.disabled = true;
    this.$excuteButton.classList.add("fixed");
    this.$menuOptions.classList.add("fixed");
  } else {
    this.$inputBox.disabled = false;
    this.$bubbleRadio.disabled = false;
    this.$quickRadio.disabled = false;
    this.$excuteButton.disabled = false;
    this.$excuteButton.classList.remove("fixed");
    this.$menuOptions.classList.remove("fixed");
  }
};
