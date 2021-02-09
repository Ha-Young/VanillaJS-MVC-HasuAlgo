export default function swapCloudsInCanvas(merged, unMerged) {
  unMerged.forEach((each, index) => {
    const eachNode = document.querySelector(`[data-value="${each}"]`);
    const newIndex = merged.findIndex(item => item === each);
    const indexGap = index - newIndex;

    const nodeCssMatrix = new WebKitCSSMatrix(getComputedStyle(eachNode).transform);
    const positionX = nodeCssMatrix.m41;
    const positionY = nodeCssMatrix.m42;

    eachNode.style.transform = `translate(${-indexGap * 100 + positionX}px, ${positionY + 50}px)`;
  })
}