import {
  days,
  hours,
  minutes,
  seconds,
  btnStart,
  datetime,
  timerId,
  updateTimer,
} from './02-timer';

export function startTimer() {
  [days, hours, minutes, seconds].forEach(item => item.classList.toggle('end'));
  btnStart.disabled = true;
  datetime.disabled = true;
  timerId = setInterval(updateTimer, 1000);
}
