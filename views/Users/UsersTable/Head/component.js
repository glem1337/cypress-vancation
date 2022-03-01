import HeadCell from '../HeadCell';

const UsersTableHead = () => (
  <thead>
    <tr>
      <th />
      <HeadCell text={{ id: 'usersTable.name' }} className="employee-table__name" sortKey="name" />
      <HeadCell text={{ id: 'usersTable.role' }} className="employee-table__position" />
      <HeadCell text={{ id: 'usersTable.status' }} className="employee-table__status" />
      <th />
    </tr>
  </thead>
);

export default UsersTableHead;
