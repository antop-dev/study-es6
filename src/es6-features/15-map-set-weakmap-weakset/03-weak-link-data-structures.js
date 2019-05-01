let isMarked = new WeakSet()
let attachedData = new WeakMap()

export class Node {
    constructor(id) {
        this.id = id
    }

    mark() {
        isMarked.add(this)
    }

    unmark() {
        isMarked.delete(this)
    }

    marked() {
        return isMarked.has(this)
    }

    set data(data) {
        attachedData.set(this, data)
    }

    get data() {
        return attachedData.get(this)
    }
}

let foo = new Node("foo")

JSON.stringify(foo) === '{"id":"foo"}'
foo.mark()
foo.data = "bar"
foo.data === "bar"
JSON.stringify(foo) === '{"id":"foo"}'

isMarked.has(foo) === true
attachedData.has(foo) === true
foo = null
/* remove only reference to foo */
attachedData.has(foo) === false
isMarked.has(foo) === false
