const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

const changeColorDelay = 1000;
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startButton.addEventListener('click', () => {
  if (intervalId === null) {
    intervalId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, changeColorDelay);

    startButton.disabled = true;
  }
});

stopButton.addEventListener('click', () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
    startButton.disabled = false;
  }
});
