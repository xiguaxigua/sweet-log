export function create(tag, options) {
  const result = document.createElement(tag);
  Object.keys(options).forEach((key) => {
    const value = options[key];
    if (typeof value === 'object') {
      Object.keys(value).forEach((valueKey) => {
        result[key][valueKey] = value[valueKey];
      });
    } else {
      result[key] = options[key];
    }
  });
  return result;
}
