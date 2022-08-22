export const classNames = (input: string) =>
  input
    .replace(/\s+/gm, ' ')
    .split(' ')
    .filter((cond) => typeof cond === 'string')
    .join(' ')
    .trim();

export const updateArray = <T, U extends keyof T, V extends keyof T>(params: {
  array: Array<T>;
  testKey: keyof T;
  testValue: T[U];
  updateKey: keyof T;
  updateValue: T[V];
  testValueFail?: T[V];
}): Array<T> => {
  const { array, testKey, testValue, updateKey, updateValue, testValueFail } =
    params;
  return array.map((item) => {
    if (item[testKey] === testValue) {
      item[updateKey] = updateValue;
    } else if (testValueFail !== undefined) {
      item[updateKey] = testValueFail;
    }
    return item;
  });
};

export const removeItem = <T>(array: Array<T>, value: T): Array<T> => {
  const index = array.indexOf(value);
  if (index > -1) array.splice(index, 1);
  return array;
};
