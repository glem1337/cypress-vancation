import PropTypes from 'prop-types';
import Link from 'next/link';

import TableHead from './Head';
import TableRow from './Row';

const UsersTable = ({
  users,
}) => (
  <div className="main-table-container">
    <div className="main-table-container__shadow" />
    <table className="main-table employee-table">
      <TableHead />
      <tbody>
        {users.map(user => (
          user.invited ? (
            <TableRow key={user.id} user={user} />
          ) : (
            <Link
              key={user.id}
              href="/users/[userId]"
              as={`/users/${user.id}`}
            >
              <TableRow user={user} />
            </Link>
          )
        ))}
      </tbody>
    </table>
  </div>
);

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default UsersTable;
