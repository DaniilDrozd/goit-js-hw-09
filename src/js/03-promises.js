import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);

async function onSubmitForm(event) {
  event.preventDefault();
  const delay = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);
  let currentDelay = 0;
  for (let i = 1; i <= amount; i += 1) {
    const position = i;
    try {
      const result = await createPromise(position, delay);
      Notify.success(
        `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
      );
    } catch (error) {
      Notify.failure(
        `❌ Rejected promise ${error.position} in ${error.delay}ms`
      );
    }
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
