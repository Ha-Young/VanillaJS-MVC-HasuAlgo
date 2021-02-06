const mergeTaskQueue = [];
const DELAY = 1000;
let isDone = false;

function createTask (type, source, target) {
    return {
        type, source, target
    }
}

export default function mergeSort (elements) {
    if (!isDone) {
        mergeTaskQueue.push(createTask("start", elements))
    }
    isDone = true;

if(elements.length < 2) {
   return elements
}

const midIdx = Math.floor(elements.length /2)
const left = elements.slice(0, midIdx);
const right = elements.slice(midIdx);

return doMerge(mergeSort(left), mergeSort(right));
}

function doMerge(left, right) {
    mergeTaskQueue.push(createTask("divide", left, right));
    const result = [];

    let leftIdx = 0;
    let rightIdx = 0;

    while(leftIdx < left.length){

    }

}

