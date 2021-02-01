export { checkData };

function checkData(data) {
  const $validationText = document.querySelector(".validation-text");
  const filteredData = data.replaceAll(',', '').replace(/ /g, '');
  const dataArray = data.replace(/ /g, '').split(",");

  if (isNaN(filteredData)) {
    $validationText.classList.remove("hidden");
    $validationText.textContent = "Only number";
    console.log("aaa");
    return;
  }

  if (dataArray.length > 10) {
    $validationText.textContent = "Only under 10 elements";
    return;
  }

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i] > 50) {
      $validationText.textContent = "Only under 50 number";
      break;
    }
  }
}
