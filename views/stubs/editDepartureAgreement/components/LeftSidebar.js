import { Button } from 'antd';

const LeftSidebar = () => (
  <div className="edit-list-left-sidebar">
    <div className="mb-60 ml-20">
      <Button
        size="large"
        shape="circle"
        type="secondary"
        icon={(<i className="icon icon-cross in-blue-1000" />)}
      />
    </div>
    <div className="text-subtitle mb-24 pl-20">
      Edit Departure Agreement
    </div>
    <ul>
      <li className="edit-list-left-sidebar__item active">
        <a className="edit-list-left-sidebar__item-link" href="/">Photos & Damage</a>
      </li>
      <li className="edit-list-left-sidebar__item">
        <a className="edit-list-left-sidebar__item-link" href="/">Final Condition Check</a>
      </li>
      <li className="edit-list-left-sidebar__item">
        <a className="edit-list-left-sidebar__item-link" href="/">Renter Responsibilities</a>
      </li>
    </ul>
  </div>
);

export default LeftSidebar;
