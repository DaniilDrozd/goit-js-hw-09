import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datetime = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dataHours = document.querySelector('[data-hours]');
const dataDays = document.querySelector('[data-days]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const value = document.querySelectorAll('.value');

let timerId = null;
btnStart.disabled = true;

flatpickr(datetime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      Notify.success('Perfectly!');
    }
  },
});

btnStart.addEventListener('click', () => {
  value.forEach(item => item.classList.toggle('end'));
  btnStart.disabled = true;
  datetime.disabled = true;
  timerId = setInterval(updateTimer, 1000);
});

const updateTimer = () => {
  const chosenDate = new Date(datetime.value);
  const timeToFinish = chosenDate - Date.now();
  const { days, hours, minutes, seconds } = convertMs(timeToFinish);

  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);

  if (timeToFinish <= 1000) {
    value.forEach(item => item.classList.add('кінець'));
    clearInterval(timerId);
    datetime.disabled = false;
  }
};

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

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
