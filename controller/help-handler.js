import { alretBox } from "../view/add-event-listeners";

export default function handleClickHelp() {
  const randomNumber = Math.floor(Math.random() * 3);
  
  const messages = {
    0: "from 5 to 10 numbers available.",
    1: "numbers better under 100.",
    2: "better submit lesser than 8 numbers for merge sort."
  }

  alretBox.textContent = messages[randomNumber];
}
