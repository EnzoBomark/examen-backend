const prod = (fn: () => void) => {
  if (process.env.NODE_ENV !== 'test') fn();
};

export default prod;
