import Notiflix from 'notiflix';
const form = document.querySelector('.form');
const options = {
  position: 'center-bottom',
  distance: '20px',
  borderRadius: '20px',
  timeout: 5000,
  clickToClose: true,
  cssAnimationStyle: 'from-right',
};

form.addEventListener('click', onPromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);
  // Перевірка на правильність введених даних

  if (!inputDelay || !inputStep || !inputAmount) {
    Notiflix.Notify.failure('❌ Please fill in all fields.', options);
    return;
  }

  // if (isNaN(inputDelay) || isNaN(inputStep) || isNaN(inputAmount)) {
  //   Notiflix.Notify.failure('❌ Please enter valid numbers', options);
  //   return;
  // }

  for (let i = 1; i <= inputAmount; i++) {
    inputDelay += inputStep;
    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          options
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          options
        );
      });
    event.currentTarget.reset();
  }
}
