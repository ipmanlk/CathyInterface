class Queue {
    constructor() {
        this.arr = [];
    }

    enqueue(item) {
        this.arr.push(item);
    }

    dequeue() {
        const item = this.arr[0];
        this.arr = this.arr.filter((rep, i) => i !== 0);
        return item;
    }

    getSize() {
        return this.arr.length;
    }
}

module.exports = {
    Queue
}