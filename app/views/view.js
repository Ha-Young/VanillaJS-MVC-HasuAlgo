export const View = function(view) {
  this.$visualFrame = document.querySelector('.visual-frame');
  this.$visual = document.querySelector('.visual');

  //this.swap = view.swap;
  //this.paint = view.paint;
}

View.prototype.create = function(v, n) {
  const $box = document.createElement('div');
  
  $box.className = 'sort-box';
  $box.innerText = v;
  $box.style.height = `${v * 15}px`;
  $box.style.transform = `translateX(${(n -1) * 25}px)`;
  
  this.$visual.appendChild($box);
};

View.prototype.delete = function() {
  this.$visual.removeChild(this.$visual.lastChild);
};

View.prototype.clear = function(n) {
  for (let i = 0; i < n; i++) {
    this.$visual.removeChild(this.$visual.lastChild);
  }
};

View.prototype.set = async function(n, array) {
  await this.setRemove(n);
  this.setCreate(n, array);
};

View.prototype.setRemove = function(n) {
  return new Promise(resolve => {
    for (let i = 0; i < n; i++) {
      this.$visual.removeChild(this.$visual.lastChild);
    }
    setTimeout(() => {
      resolve();
    }, 200)
  });
};

View.prototype.setCreate = function(n, array) {
  for (let i = 0; i < n; i++) {
    this.create(array[i], i + 1);
  }
};
// bubble sort 전용 methods..
View.prototype.swap = function(a, b) {
  const $target = document.querySelector('.visual');
  const $boxs = document.querySelectorAll('.sort-box');

  return new Promise(resolve => {
    const styleA = window.getComputedStyle($boxs[a]);
    const styleB = window.getComputedStyle($boxs[b]);
    
    const transformA = styleA.getPropertyValue('transform');
    const transformB = styleB.getPropertyValue('transform');

    $boxs[a].style.transform = transformB;
    $boxs[b].style.transform = transformA;
    
    window.requestAnimationFrame(function() {
      setTimeout(() => {
        $target.insertBefore($boxs[b], $boxs[a]);
        resolve();
      }, 1000);
    });
  });
};

View.prototype.paint = function(a, b, n) {
  const $boxs = document.querySelector('.sort-box');

  $boxs[a].style.backgroundColor = "#58B7FF";
  $boxs[b].style.backgroundColor = "#58B7FF"; // 비교중 색칠
  $boxs[$boxs.length -n -1].style.backgroundColor = "#13CE66"; // 완료됨 색칠
};
