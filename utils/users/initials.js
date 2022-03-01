export default profile => (profile.firstName && profile.lastName
  ? `${profile.firstName[0]}${profile.lastName[0]}`
  : '');
