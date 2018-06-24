type getUniqKeyType = () => number;

let nextKey = 0;
export const getUniqKey: getUniqKeyType = () => nextKey++;