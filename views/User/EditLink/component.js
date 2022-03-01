import PropTypes from 'prop-types';
import Link from 'next/link';

const UserEditLink = ({ userId, path }) => (
  <Link
    href={`/users/[userId]/edit${path}`}
    as={`/users/${userId}/edit${path}`}
  >
    <span className="icon icon-edit-pencil in-gray-600 c-pointer" />
  </Link>
);

UserEditLink.defaultProps = {
  path: '',
};

UserEditLink.propTypes = {
  userId: PropTypes.string.isRequired,
  path: PropTypes.string,
};

export default UserEditLink;
