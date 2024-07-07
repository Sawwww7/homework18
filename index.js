/////////////////////////////////////////////////////////////////////////////////////////////////
/*sumArrayPromise.Напишіть функцію, яка приймає масив чисел як аргумент і повертає Promise.
 Promise має бути виконаний через 3 секунди і повернути суму всіх чисел із масиву.
 sumArrayPromise([1, 2, 3, 4, 5]).then(console.log)
// 15;*/
////////////////////////////////////////////////////////////////////////////////////////////////

const sumArrayPromise = (arrNumbers) => 
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        arrNumbers.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        )
      );
    }, 3000);
  });

sumArrayPromise([1, 2, 3, 4, 5]).then(console.log);

////////////////////////////////////////////////////////////////////////////////////////
/*concurrentPromises.Створіть функцію concurrentPromises, 
яка приймає масив промісів і максимальну кількість промісів,
 що виконуються одночасно. Функція має виконати проміси паралельно, але не більше зазначеної максимальної кількості.
  Результатом функції має бути масив результатів промісів.
  concurrentPromises([
	new Promise(resolve => setTimeout(() => resolve('Promise 1'), 1000)),
	new Promise(resolve => setTimeout(() => resolve('Promise 2'), 500)),
	new Promise(resolve => setTimeout(() =>resolve('Promise 3'), 800))
], 2).then(console.log);
// Через 1000мс виводить: ["Promise 1", "Promise 2"]
// Через 1300мс виводить: "Promise 3"*/
///////////////////////////////////////////////////////////////////////////////////////////

/*1. Принимает массив промисов promises и максимальное количество одновременно выполняемых промисов maxConcurrent.
2. Использует массив results для хранения результатов выполнения промисов и массив executing 
для отслеживания текущих выполняемых промисов.
3. Функция enqueue добавляет промисы в выполнение, пока не достигнет максимального количества
 одновременно выполняемых промисов.
4. Когда промис завершается, его результат сохраняется в results, и функция enqueue вызывается
 снова для запуска следующих промисов.
5. Если все промисы завершены, вызывается resolve с массивом результатов.*/

function concurrentPromises(promises, maxConcurrent) {
  let index = 0;
  const results = [];
  const executing = [];

  function runNext() {
      if (index >= promises.length && executing.length === 0) {
          return Promise.resolve(results);
      }

      while (index < promises.length && executing.length < maxConcurrent) {
          const currentIndex = index++;
          const promise = promises[currentIndex];
          console.log(`Starting promise ${currentIndex + 1}`);

          const p = promise.then((result) => {
              console.log(`Finished promise ${currentIndex + 1}`);
              results[currentIndex] = result;
              executing.splice(executing.indexOf(p), 1);
          });

          executing.push(p);
      }

      const next = Promise.race(executing).then(runNext);
      return next;
  }

  return runNext().then(() => Promise.all(executing)).then(() => results);
}

// Пример использования:
concurrentPromises([
  new Promise(resolve => setTimeout(() => resolve('Promise 1'), 1000)),
  new Promise(resolve => setTimeout(() => resolve('Promise 2'), 500)),
  new Promise(resolve => setTimeout(() => resolve('Promise 3'), 800)),
  new Promise(resolve => setTimeout(() => resolve('Promise 4'), 1200)),
  new Promise(resolve => setTimeout(() => resolve('Promise 5'), 1400)),
  new Promise(resolve => setTimeout(() => resolve('Promise 6'), 800))
], 2).then((results) => {
  console.log(results); // Должно выводить результаты по мере их завершения
});

////////////////////////////////////////////////////////////////////////////////////////////////
/*sequenceAsync.Реалізуйте функцію sequenceAsync, яка приймає масив функцій-промісів asyncFunctions. 
Кожна функція-проміс приймає попередній результат як аргумент і повертає новий результат.
 Функція sequenceAsync має виконати проміси послідовно, передаючи результат попереднього промісу в наступний. 
 Зверніть увагу, що вам потрібно надати реалізацію функції sequenceAsync,
  яка дозволяє виконувати довільну кількість функцій-промісів у правильному порядку.*/
/////////////////////////////////////////////////////////////////////////////////////////////////


async function sequenceAsync(arr) {
  let result;
  for (const func of arr) {
      result = await func(result);
  }
  return result;

  /*const result = [];
  for (const item of arr) {
    result.push(await item(result[result.length - 1]));
  }
  return result[result.length-1];*/
}

const myArrPromise = [ 
  (resul = 0) =>
    new Promise((resolve) => setTimeout(() => resolve(resul + 200), 500)),
  (resul = 0) =>
    new Promise((resolve) => setTimeout(() => resolve(resul + 100), 800)),
  (resul = 0) =>
    new Promise((resolve) => setTimeout(() => resolve(resul + 150), 900)),
  (resul = 0) =>
    new Promise((resolve) => setTimeout(() => resolve(resul + 300), 1000)),
]
sequenceAsync(myArrPromise).then(console.log);


const myArrPromise2 = [ 
  (resul = "") =>
    new Promise((resolve) => setTimeout(() => resolve(`Hello${resul}`), 500)),
  (resul = "") =>
    new Promise((resolve) => setTimeout(() => resolve(`${resul},`), 800)),
  (resul = "") =>
    new Promise((resolve) => setTimeout(() => resolve(`${resul}world`), 900)),
  (resul= "") =>
    new Promise((resolve) => setTimeout(() => resolve(`${resul}!`), 1000)),]

  sequenceAsync(myArrPromise2).then(console.log);

