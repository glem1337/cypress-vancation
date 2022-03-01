export default ({ key, active }) => {
  if (typeof active !== 'string' || typeof key !== 'string') return false;
  const transformKey = key.toLocaleLowerCase().replace('_', '-');

  return active === transformKey;
};
