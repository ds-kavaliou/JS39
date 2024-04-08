# JS39; HomeWork 1;

## 1. Метод запроса OPTIONS - когда вызывается, где используется, что передает и принимает.

HTTP Метод **OPTIONS** - это метод, который используется для запроса информации о действиях, доступных для взаимодействия с целевым ресурсом.

**OPTIONS** используется для определения возможностей сервера или того, какое взаимодействие разрешено с определенным ресурсом, без необходимости совершать конкретные действия.

Request:

```bash
  OPTIONS /index.html HTTP/1.1
  Host: www.example.com
```

Response:

```bash
  HTTP/1.1 200 OK
  Date: Mon, 10 April 2023 10:00:00 GMT
  Server: Apache/2.4.1 (Unix)
  Allow: GET, HEAD, POST, OPTIONS
  Content-Length: 0
  Content-Type: text/html
```

В контексте **CORS**, метод **OPTIONS** играет роль предварительного запроса (preflight request), который отправляется браузером автоматически перед основным запросом к серверу для проверки, разрешено ли выполнение запроса с учетом политики CORS.

Request:

```bash
  OPTIONS /resource POST HTTP/1.1
  Host: api.example.com
  Origin: https://web.example.com
  Access-Control-Request-Method: POST
  Access-Control-Request-Headers: Content-Type
```

Response:

```bash
  HTTP/1.1 200 OK
  Access-Control-Allow-Origin: https://web.example.com
  Access-Control-Allow-Methods: POST, GET
  Access-Control-Allow-Headers: Content-Type
  Access-Control-Max-Age: 86400
```

## 2. Ключевые особенности "HTTP" Версии 3.0

**Основные цели и причины, побудившие к разработке HTTP/3:**

1. **Уменьшение задержек.** Устранение проблемы блокировки начала очереди (Head-of-Line blocking, HOL blocking), возникающей из-за использования одного TCP соединения для мультиплексирования нескольких потоков. Это приводит к тому, что задержка в одном потоке может блокировать остальные, даже если они готовы к передаче.

2. **Быстрое установление соединения.** HTTP/2 и HTTPS на основе TCP и TLS требуют нескольких раундов рукопожатия для установления защищенного соединения, что добавляет задержку при первом подключении.

3. **Улучшенное восстановление соединения.** Смена IP-адреса или сетевых условий часто приводит к разрыву TCP соединений, требуя нового рукопожатия и замедляя передачу данных.

4. **Встроенное шифрование.** Безопасность данных является критически важной, и HTTP/3 внедряет шифрование на уровне транспорта по умолчанию.

5. **Эффективное управление перегрузкой и потоком.** Улучшение механизмов для управления потоком и перегрузкой, что обеспечивает более надежную и эффективную передачу данных даже в условиях нестабильного соединения.

6. **Оптимизация для мобильных сетей.** С увеличением использования мобильного интернета возрастает необходимость в протоколах, оптимизированных для условий с высокой потерей пакетов и частой сменой сетей.

**Основные особенности HTTP/3:**

1. **HTTP/3** использует протокол QUIC (быстрый универсальный интернет-протокол связи) в качестве основы для транспортного уровня вместо TCP.

   **QUIC** (Quick UDP Internet Connections) — это современный транспортный сетевой протокол, разработанный компанией Google и стандартизированный Интернет-инженерной группой задач (IETF). Он предназначен для замены TCP (Transmission Control Protocol) и TLS (Transport Layer Security) в некоторых сценариях использования, особенно для улучшения производительности веб-приложений и сервисов.

   **QUIC** основан на **UDP** (User Datagram Protocol), но предоставляет множество ключевых функций, традиционно ассоциируемых с **TCP**, включая надежную доставку данных, контроль перегрузки и потока. Он также интегрирует функции шифрования и безопасности на уровне протокола, аналогичные тем, что предоставляет **TLS**.

   ![L4](/assets/L4.png)

2. **Встроенное шифрование.**
   QUIC включает шифрование по умолчанию, аналогичное TLS, но с улучшенной процедурой рукопожатия. Это обеспечивает повышенную безопасность и конфиденциальность данных, передаваемых между клиентом и сервером.

3. **Мультиплексирование без блокировки.**
   Благодаря использованию QUIC, HTTP/3 позволяет эффективнее мультиплексировать запросы и ответы на одном соединении, уменьшая задержки и улучшая производительность загрузки веб-страниц.

   ![L7](/assets/L7.png)

4. **Улучшенная работа в условиях плохой сети.**
   HTTP/3 лучше справляется с потерей пакетов и изменениями в сетевых условиях, что делает его особенно подходящим для мобильных устройств и пользователей с нестабильным соединением.

5. **Быстрое рукопожатие.**
   QUIC уменьшает количество раундов рукопожатия при установлении соединения, что ускоряет первоначальную загрузку веб-страниц.

6. **Миграция соединений.**
   QUIC позволяет клиентам сменить IP-адрес (например, при смене сети) без необходимости устанавливать новое соединение, что улучшает общую устойчивость соединения.

7. **Управление перегрузкой и потоком.**
   QUIC внедряет передовые механизмы управления перегрузкой и потоком, которые адаптируются к текущим сетевым условиям, чтобы максимизировать производительность без перегрузки сети.

### 3. Cпособы отмены запроса, включая объект "AbortController"

Отмена HTTP-запросов может быть необходима в ряде сценариев, где пользовательский интерфейс часто обновляется в ответ на действия пользователя или изменения данных. Отмена HTTP-запросов может играть ключевую роль в предотвращении **race conditions** (состояний гонки) в веб-приложениях.

Некоторые из способов отмены запросов:

1. Использование объекта **AbortController** с Fetch API

```js
const controller = new AbortController();
const signal = controller.signal;

fetch(url, { signal })
  .then(response => /* обработка ответа */)
  .catch(err => /* обработка ошибок, включая отмену */);

// Для отмены запроса:
controller.abort();
```

2. Использование **XMLHttpRequest**

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.send();

// Для отмены запроса:
xhr.abort();
```

3. Отмена неактуальных запросов при помощи функции debounce

```js
function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    return new Promise<ReturnType<T> | Error>((resolve, reject) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          let output = callback(...args);
          resolve(output);
        } catch (err) {
          if (err instanceof Error) {
            reject(err);
          }
          reject(new Error(`An error has occurred:${err}`));
        }
      }, delay);
    });
  };
}


const searchBox = document.querySelector<HTMLInputElement>("#search-box");

searchBox?.addEventListener("input", (e) => {
  const { value } = e.target as HTMLInputElement;
  debounced(value).then(console.log).catch(console.log);
});

const debounced = debounce(fetchByName, 1000);

function fetchByName(name: string) {
  return fetch(`https://rickandmortyapi.com/api/character?name=${name}`);
}
```

### 4. Написать по 2 примера создания примитивных значений (если есть несколько способов - использовать) (string, number, boolean, null, undefined, symbol, bigInt)

- String:

  ```js
  const s1 = "";
  const s2 = "";
  const s3 = ``;
  const s4 = String("value");
  ```

- Number:

  ```js
  const n1 = 1;
  const n2 = Number("10");
  const n3 = parseInt("10");
  const n4 = parseFloat("10.02");
  ```

- Boolean:

  ```js
  const b1 = true;
  const b2 = Boolean("value");
  const b3 = !!"value";
  ```

- null:

  ```js
  const nil = null;
  ```

- undefined:

  ```js
  let u1;
  let u2 = undefined;
  ```

- Symbol:

  ```js
  const symbol1 = Symbol("description");
  const symbol2 = Symbol();
  ```

- BigInt:

  ```js
  const bi1 = 10n;
  const bi2 = BigInt(10);
  ```

### 5. Почему, если обратиться к переменным созданным через let, const до их объявления - мы получаем ReferenceError?

По причине попадания переменной в `temporal dead zone`.
**Temporal Dead Zone** (TDZ) - это область блока, в которой переменная недоступна до того момента, когда компьютер полностью инициализирует ее значением.

### 6. Решить:

```js
const res = "B" + "a" + (1 - "hello");
console.log(res); // "BaNaN"
```

```js
const res2 = (true && 3) + "d";
console.log(res2); // "3d"
```

```js
const res3 = Boolean(true && 3) + "d";
console.log(res3); // "trued"
```
