/////////////////////////////////////////////////////////////////////////////////////////////////
/*sumArrayPromise.Напишіть функцію, яка приймає масив чисел як аргумент і повертає Promise.
 Promise має бути виконаний через 3 секунди і повернути суму всіх чисел із масиву.
 sumArrayPromise([1, 2, 3, 4, 5]).then(console.log)
// 15;*/
////////////////////////////////////////////////////////////////////////////////////////////////
/*
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

sumArrayPromise([1, 2, 3, 4, 5]).then(console.log);*/

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


const concurrentPromises3 = (arrPromises, quantity) => {
  let a = 0;
  let arrProm = arrPromises.slice(a, quantity + a);
  let promis = Promise.all(arrProm).then((values) => {
    (a += 1), console.log(a);
    return values;
  });
  return promis;
};

const arrPromises3 = [
  new Promise((resolve) => setTimeout(() => resolve("Promise 1"), 1000)),
  new Promise((resolve) => setTimeout(() => resolve("Promise 2"), 500)),
  new Promise((resolve) => setTimeout(() => resolve("Promise 3"), 800)),
  new Promise((resolve) => setTimeout(() => resolve("Promise 3"), 800)),
];

concurrentPromises3(arrPromises3, 2).then(console.log);
/////////////////////////////////////////////////////////////////////////////

async function concurrentPromises2(arrPromises, quantity) {
  let a = 0;
  let allPromises2 = arrPromises.slice(a, quantity + a);
  for (const item of allPromises2) {
    //debugger
    let response = await item;
    a = a + 1;
    console.log(a);
    console.log(response);
  }
}

concurrentPromises2(
  [
    new Promise((resolve) => setTimeout(() => resolve("Promise 1"), 2000)),
    new Promise((resolve) => setTimeout(() => resolve("Promise 2"), 3000)),
    new Promise((resolve) => setTimeout(() => resolve("Promise 3"), 7000)),
    new Promise((resolve) => setTimeout(() => resolve("Promise 4"), 9000)),
  ],
  2
)//.then(console.log)



////////////////////////////////////////////////////////////////////////////////////////////////
/*sequenceAsync.Реалізуйте функцію sequenceAsync, яка приймає масив функцій-промісів asyncFunctions. 
Кожна функція-проміс приймає попередній результат як аргумент і повертає новий результат.
 Функція sequenceAsync має виконати проміси послідовно, передаючи результат попереднього промісу в наступний. 
 Зверніть увагу, що вам потрібно надати реалізацію функції sequenceAsync,
  яка дозволяє виконувати довільну кількість функцій-промісів у правильному порядку.*/
/////////////////////////////////////////////////////////////////////////////////////////////////

/*
async function sequenceAsync(arr) {
  const result = [];
  for (const item of arr) {
    result.push(await item(result[result.length - 1]));
  }
  return result[result.length-1];
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
*/
