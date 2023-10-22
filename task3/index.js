const NodeCache = require("node-cache");
const cache = new NodeCache();

function calculateFibonacci(n) {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}


function getFibonacci(n) {
  const cacheKey = `fibonacci_${n}`;
  const cachedResult = cache.get(cacheKey);

  if (cachedResult !== undefined) {
    console.log(`Cache Hit: Fibonacci(${n}) = ${cachedResult}`);
    return cachedResult;
  } else {
    const result = calculateFibonacci(n);
    cache.set(cacheKey, result, 3600);
    console.log(`Cache Miss: Fibonacci(${n}) = ${result}`);
    return result;
  }
}


const n = 10;
console.log(getFibonacci(n));
console.log(getFibonacci(n));
