# JS39; HomeWork;

### 1. Почему массивы в JS являются "неправильными" и совмещают в себе несколько структур данных? Какие?

В JavaScript массивы имеют уникальные особенности, которые отличают их от массивов во многих других языках программирования. Массивы в JS cовмещают различные структуры данных.

1. Массивы в JavaScript можно использовать как стеки, используя методы .push() для добавления элемента в конец массива и .pop() для его удаления.
2. Используя методы .push() для добавления элемента в конец массива и .shift() для удаления первого элемента, массивы могут функционировать как очереди.

### 2. Привязать контекст объекта к функции logger, чтобы при вызове this.item выводило - some value (Привязать через bind, call, apply)

Дано:

```js
function logger() {
  console.log(`I output only external context: ${this.item}`);
}

const obj = { item: "some value" };
```

Тогда:

```js
logger.call(obj);
logger.apply(obj);
logger.bind(obj)();
```

### 3.1 Массивы:

- Создайте массив чисел и найдите его сумму.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const sum = numbers.reduce((sum, n) => sum + n, 0);
```

- Создайте массив строк и объедините их в одну строку.

```js
const strings = ["This", "is", "simple", "example"];
const string = strings.join(" ");
```

- Найдите максимальный и минимальный элементы в массиве чисел.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const min = Math.min(...numbers);
const max = Math.max(...numbers);
```

### 3.2 Stack (стек):

- Реализуйте стек с использованием массива.

```js
class Stack {
  #stack = [];

  push(value) {
    this.#stack.push(value);
  }

  pop() {
    return this.#stack.pop();
  }

  peek() {
    return this.#stack.at(-1);
  }
}
```

### 3.3 Queue (очередь):

- Реализуйте очередь с использованием массива.
- Имитируйте работу очереди на примере ожидания на кассе.

```js
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
```

### 4. Реализовать полифил(собственную функцию реализующую встроенную в js) метода bind()

```js
Function.prototype.bind = function (ctx) {
  return (...args) => {
    return this.apply(ctx, args);
  };
};
```

```js
Function.prototype.bind = function (ctx) {
  const func = this;
  return function (...args) {
    return func.apply(this === globalThis ? ctx : this, args);
  };
};
```
