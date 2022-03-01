export default (firstName, LastName) => {
  const first = typeof firstName === 'string' ? firstName.trim().charAt(0) : '';
  const last = typeof LastName === 'string' ? LastName.trim().charAt(0) : '';

  return `${first}${last}`.toLocaleUpperCase();
};
