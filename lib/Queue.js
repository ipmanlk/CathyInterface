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

    remove(id) {
        const rep = this.arr.find((rep, i) => rep.id === id);
        this.arr = this.arr.filter((rep,i) => rep.id !== id);
        return rep;
    }

    getSize() {
        return this.arr.length;
    }
}

module.exports = {
    Queue
}