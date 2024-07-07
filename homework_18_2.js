concurrentPromises([
	new Promise(resolve => setTimeout(() => resolve('Promise 1'), 1000)),
	new Promise(resolve => setTimeout(() => resolve('Promise 2'), 500)),
	new Promise(resolve => setTimeout(() =>resolve('Promise 3'), 800))
], 2).then(console.log);
// Через 1000мс виводить: ["Promise 1", "Promise 2"]
// Через 1300мс виводить: "Promise 3"