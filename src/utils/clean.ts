const clean = <T extends object>(obj: T): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const copy: any = { ...obj };

  Object.keys(copy).forEach((key) => {
    if (!copy[key]) delete copy[key];
  });

  return copy;
};

export default clean;
