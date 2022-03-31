import debug from './debug';

const kill = (err: Error) => {
  debug(err.message);
  process.exitCode = 1;
  process.kill(process.pid, 'SIGTERM');
};

export default kill;
