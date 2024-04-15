function logger() {
  console.log(`I output only external context: ${this.item}`);
}

const obj1 = { item: "first some value" };
const obj2 = { item: "last some value" };

logger.call(obj1);
logger.apply(obj1);
logger.bind(obj1)();

// stack

class Stack {
  #array = [];

  push(value) {
    this.#array.push(value);
  }

  pop() {
    return this.#array.pop();
  }

  peek() {
    return this.#array.at(-1);
  }
}

// queue

class Queue {
  #array = [];
  enqueue(value) {
    this.#array.push(value);
  }
  dequeue() {
    return this.#array.shift(value);
  }
  peek() {
    return this.#array.at(0);
  }
}

Function.prototype.bind = function (ctx) {
  const func = this;
  return function (...args) {
    return func.apply(this === globalThis ? ctx : this, args);
  };
};

logger.bind(obj1).bind(obj2)();
