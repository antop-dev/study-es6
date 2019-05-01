let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let b = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

for (let i = 0; i < a.length; i++) {
    // 변수 x는 이 for문 스코프({}) 안에서만 유효하다.
    let x = a[i]
}
for (let i = 0; i < b.length; i++) {
    // 변수 y는 이 for문 스코프({}) 안에서만 유효하다.
    let y = b[i]
}

let callbacks = []
for (let i = 0; i <= 2; i++) {
    callbacks[i] = function () {
        return i * 2
    }
}

console.log(callbacks);

console.log(callbacks[0]() === 0)
console.log(callbacks[1]() === 2)
console.log(callbacks[2]() === 4)
