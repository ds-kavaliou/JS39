# JS39; HomeWork 2;

### 1. Создать объект counter всеми возможными способами;

1. С помощью литерала объекта:

```js
const counter = { count: 0 };
```

2. С помощью конструктора Object:

```js
const counter = new Object();
counter.count = 0;
```

3. С помощью Object.create():

```js
const counter = Object.create(Object.prototype, {
  count: { value: 0, writable: true, configurable: false, enumerable: true },
});
```

4. С помощью фабричной функции:

```js
function createCounter() {
  return {
    count: 0,
  };
}
const counter = createCounter();
```

5. С помощью функции-конструктора:

```js
function Counter() {
  this.count = 0;
}
const counter = new Counter();
```

6. С помощью класса:

```js
class Counter {
  constructor() {
    this.count = 0;
  }
}
const counter = new Counter();
```

### 2. Скопировать объект counter всеми возможными способами;

Предположим, у нас есть объект counter:

```js
const counter = { count: 0 };
```

Тогда скопировать объект можем:

1. С помощью Object.assign():

```js
const counterCopy = Object.assign({}, counter);
```

2. С помощью spread оператора

```js
const counterCopy = { ...counter };
```

3. С помощью JSON.stringify() и JSON.parse() (глубокое копирование)

```js
const counterCopy = JSON.parse(JSON.stringify(counter));
```

4. С помощью метода Object.create() для копирования прототипа:

```js
const counterCopy = Object.create(
  Object.getPrototypeOf(counter),
  Object.getOwnPropertyDescriptors(counter)
);
```

5. С помощью ручного копирования свойств:

```js
const counterCopy = {};
for (let key in counter) {
  counterCopy[key] = counter[key];
}
```

### 3. Создать функцию makeCounter всеми описанными и возможными способами;

1. Объявление функции (Function Declaration):

```js
function makeCounter() {
  let counter = 0;
  return function () {
    return counter++;
  };
}
```

2. Функциональное выражение (Function Expression)

```js
const makeCounter = function () {
  let counter = 0;
  return function () {
    return counter++;
  };
};
```

3. Стрелочная функция (Arrow Function)

```js
const makeCounter = () => {
  let counter = 0;
  return () => counter++;
};
```

4. Функция-конструктор (Function Constructor)

```js
const makeCounter = new Function(
  "counter",
  "return function() { return counter++; }"
)(0);
```

5. Метод объекта (Object Method Shorthand)

```js
const counterObject = {
  counter: 0,
  makeCounter() {
    return () => this.counter++;
  },
};
```

### 4. Работа глобальной функции structuredClone()

### 5. Бонус

1. Написать функцию глубокого сравнения двух объектов:

```js
const obj1 = { here: { is: "on", other: "3" }, object: "Y" };

const obj2 = { here: { is: "on", other: "2" }, object: "Y" };
```

Решение:

```js
const deepEqual = (obj1, obj2) => {
  const compare = (obj1, obj2) => {
    return Object.keys({ ...obj1, ...obj2 }).every((key) => {
      // check if key in object
      if (key in obj1 && key in obj2) {
        // check if obj[key] is an object and not null
        return obj1[key] === Object(obj1[key]) &&
          obj2[key] === Object(obj2[key])
          ? compare(obj1[key], obj2[key])
          : obj1[key] === obj2[key];
      }
      return false;
    });
  };
  return compare(obj1, obj2);
};
```

2. Развернуть строку в обратном направлении при помощи методов массивов:

Решение:

```js
function reverseStr(str) {
  return [...str].reverse().join("");
}
```
