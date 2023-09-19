import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const resetButton = document.querySelector('[data-reset]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future.');
    } else {
      startButton.disabled = false;
    }
  },
};

let countdownIntervalId;
startButton.disabled = true;
resetButton.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(timeRemaining) {
  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  daysValue.textContent = days.toString().padStart(2, '0');
  hoursValue.textContent = hours.toString().padStart(2, '0');
  minutesValue.textContent = minutes.toString().padStart(2, '0');
  secondsValue.textContent = seconds.toString().padStart(2, '0');
}

function startCountdown() {
  const selectedDate = datetimePicker._flatpickr.selectedDates[0];

  if (selectedDate <= new Date()) {
    Notiflix.Notify.failure('Please choose a date in the future.');
    startButton.disabled = true;
    return;
  }

  startButton.disabled = true;
  datetimePicker.disabled = true;
  resetButton.disabled = false;

  countdownIntervalId = setInterval(() => {
    const currentTime = new Date();
    const timeRemaining = selectedDate - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(countdownIntervalId);
      datetimePicker.disabled = false;
      updateTimerDisplay(0);
      Notiflix.Notify.success('Countdown completed!');
    } else {
      updateTimerDisplay(timeRemaining);
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdownIntervalId);
  datetimePicker.disabled = false;
  daysValue.textContent = '00';
  hoursValue.textContent = '00';
  minutesValue.textContent = '00';
  secondsValue.textContent = '00';
  startButton.disabled = true;
  resetButton.disabled = true;
}

startButton.addEventListener('click', startCountdown);

resetButton.addEventListener('click', resetTimer);

flatpickr('#datetime-picker', options);
