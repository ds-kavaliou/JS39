// 1

const array = [10, 12, 15, 21];

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

// 2

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

// 3

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

// 4

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
