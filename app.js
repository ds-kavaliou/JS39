// Bonus Task #1
const obj1 = {
  here: { is: "on", other: "3", another: { x: 1 } },
  object: {},
};

const obj2 = {
  here: { is: "on", other: "3", another: { x: 1 } },
  object: {},
};

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

console.log(deepEqual(obj1, obj2));

// Bonus Task #2

function reverseStr(str) {
  return [...str].reverse().join("");
}

console.log(reverseStr("hi there"));
