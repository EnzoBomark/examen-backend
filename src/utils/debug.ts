const debug = (string: string) =>
  process.env.NODE_ENV !== 'production' && process.stdout.write(`${string}\n`);

export default debug;
