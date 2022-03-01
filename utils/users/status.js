export default ({ invited, active }) => {
  if (invited) { return 'profileStatus.pending'; }

  return active ? 'profileStatus.active' : 'profileStatus.deactivated';
};
