function getRandomNum(num = 10) {
  return Math.floor(Math.random() * num);
}

function getRandomLetter() {
  const lettrsRange = ["A","B","C","D","E","F"];
  const randomNumUnderSix = getRandomNum(6);
  
  return lettrsRange[randomNumUnderSix];
}

export default function getRandomHexCode() {
  let hexCode="";

  for(let i = 0; i < 6; i++){
      let random = getRandomNum();
      let eachCode = (random % 2 === 0) ? getRandomLetter() : getRandomNum();
      hexCode += eachCode;
  }

  return hexCode;
}