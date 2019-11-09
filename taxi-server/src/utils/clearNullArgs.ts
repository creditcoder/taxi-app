const clearNullArgs = args => {
  const result = {};
  Object.keys(args).forEach(key => {
    if (args[key] !== null) {
      result[key] = args[key];
    }
  });
  return result;
};

export default clearNullArgs;
