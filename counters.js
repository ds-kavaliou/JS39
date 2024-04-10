class Counter1 {
  #value;
  #step;
  #initial;

  constructor(initial = 0, step = 1) {
    this.#initial = initial;
    this.#value = initial;
    this.#step = step;
  }

  get value() {
    return this.#value;
  }

  increment() {
    this.#value += this.#step;
  }

  decrement() {
    this.#value -= this.#step;
  }

  reset() {
    this.#value = this.#initial;
  }
}

const Counter2 = (() => {
  let _value;
  let _step;
  let _initial;

  function Counter(initial = 0, step = 1) {
    _initial = initial;
    _value = initial;
    _step = step;

    Object.defineProperty(this, "value", {
      get() {
        return _value;
      },
    });
  }

  Counter.prototype.increment = function () {
    _value += _step;
  };

  Counter.prototype.decrement = function () {
    _value -= _step;
  };

  Counter.prototype.reset = function () {
    _value = _initial;
  };

  return Counter;
})();

const c1 = {
  value: 0,
  increment() {
    this.value += 1;
  },
  decrement() {
    this.value -= 1;
  },
  reset() {
    this.value = 0;
  },
};

const c2 = Object.create(
  {
    increment() {
      this.value += 1;
    },
    decrement() {
      this.value -= 1;
    },
    reset() {
      this.value = 0;
    },
  },
  {
    value: {
      value: 0,
      writable: true,
    },
  }
);
