export default function delay(DELAY_TIME = 700) {
  return new Promise(resolve => setTimeout(resolve, DELAY_TIME));
}
