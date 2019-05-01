const evens = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]

const odds = evens.map(v => v + 1)
const pairs = evens.map(v => ({even: v, odd: v + 1}))
const nums = evens.map((v, i) => v + i)

console.log(odds);
console.log(pairs);
console.log(nums);
