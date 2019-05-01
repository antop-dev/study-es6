const evens = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
const nums = evens.map((v, i) => v + i)
const fives = [];

nums.forEach(v => {
    if (v % 5 === 0)
        fives.push(v)
})
