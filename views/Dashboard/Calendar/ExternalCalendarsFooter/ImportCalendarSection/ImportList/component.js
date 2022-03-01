import PropTypes from 'prop-types';
import { Button } from 'antd';

import isPresent from 'utils/isPresent';

const ImportList = ({ items, onRemove, onEdit }) => {
  if (!isPresent(items)) {
    return null;
  }

  return (
    <ul className="mb-24">
      {items.map((calendar) => (
        <li key={calendar.id} className="calendar-listing__footer-item">
          <span className="text-subheader font-400">{calendar.name}</span>
          <div className="d-flex align-self-start ml-16">
            <Button
              onClick={onEdit(calendar)}
              className="mr-8"
              type="secondary"
              icon={<i className="icon icon-edit-pencil" />}
            />
            <Button
              onClick={onRemove(calendar.id)}
              type="delete"
              icon={<i className="icon icon-delete" />}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

ImportList.defaultProps = {
  items: null,
};

ImportList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ImportList;
