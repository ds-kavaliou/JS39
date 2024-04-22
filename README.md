# JS39; HomeWork 5;

### 1. Порешать типовые задачи - написать порядок и вывод в консоли:

```js
let promiseTwo = new Promise((resolve, reject) => {
  resolve("a");
});

promiseTwo
  .then((res) => {
    return res + "b"; // 1
  })
  .then((res) => {
    return res + "с"; // 2
  })
  .finally((res) => {
    return res + "!!!!!!!"; // 3
  })
  .catch((res) => {
    return res + "d"; // ignored
  })
  .then((res) => {
    console.log(res); // 4 log abc
  });
```

```js
function doSmth() {
  return Promise.resolve("123");
}

doSmth()
  .then(function (a) {
    console.log("1", a); // log '1', '123'
    return a;
  })
  .then(function (b) {
    console.log("2", b); // log '2' '123'
    return Promise.reject("321");
  })
  .catch(function (err) {
    console.log("3", err); // log '3' '321'
  })
  .then(function (c) {
    console.log("4", c); // log '4' undefined
    return c;
  });
```

### 2. Напишите функцию, которая будет проходить через массив целых чисел и выводить индекс каждого элемента с задержкой в 3 секунды.

Входные данные: [10, 12, 15, 21]

```js
function delay(s = 1000) {
  return async () => new Promise((resolve) => setTimeout(resolve, s));
}

async function print(array, asyncFn) {
  for (let i = 0; i <= array.length; i++) {
    await asyncFn();
    console.log(i);
  }
}

print(array, delay(3000));
```

### 3. Прочитать про Top Level Await (можно ли использовать await вне функции async)

**Top Level Await** — это возможность использовать оператор await в верхнем уровне модуля JavaScript, то есть вне асинхронной функции (async). Это одна из новых возможностей, которая была введена в последних версиях стандарта ECMAScript и уже поддерживается в современных версиях браузеров и Node.js.

Ключевые особенности Top Level Await:

- Модульность: Top Level Await работает только в модулях (ES Modules). Это означает, что вы не можете использовать await на верхнем уровне в обычных скриптах, которые не являются модулями.
- Блокировка: При использовании await на верхнем уровне, выполнение модуля блокируется до тех пор, пока не разрешится Promise, на который ожидается. Это также влияет на модули, которые импортируют данный модуль, так как они будут загружаться и выполняться только после того, как Promise будет разрешен.
- Динамический импорт: Это позволяет динамически загружать модули с использованием условий и асинхронной логики без необходимости оборачивать весь код в асинхронные функции.

### 4. БОНУС ЗАДАНИЕ

Необходимо реализовать функцию fetchUrl, которая будет использоваться следующим образом.
Внутри fetchUrl можно использовать условный метод fetch, который просто возвращает
Promise с содержимым страницы или вызывает reject \_/
fetchUrl('https://google/com&#39;)
.then(...)
.catch(...) // сatch должен сработать только после 5 неудачных попыток
получить содержимое страницы внутри fetchUrl

```js
async function fetchUrl(url) {
  const MAX = 5;
  let attempt = 0;

  async function request(url) {
    try {
      return await fetch(url);
    } catch (error) {
      if (attempt >= MAX) {
        throw error;
      }
      attempt++;
      return request(url);
    }
  }

  return request(url);
}

fetchUrl("https://google/com").then(console.log).catch(console.log);
```
