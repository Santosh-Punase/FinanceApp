export const stringifyObject = (value: any): string => {
  return JSON.stringify(value);
};

export const parseObject = (value: string): Object => {
  return value ? JSON.parse(value) : null;
}
