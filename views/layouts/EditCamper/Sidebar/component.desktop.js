import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SidebarDesktop = ({ items, onItemClick }) => (
  <div className="edit-list-left-sidebar">
    <div className="text-subtitle mb-24 pl-20">
      <FormattedMessage id="dashboard.editCamper.sidebar.title" />
    </div>
    <ul>
      {items.map((item) => (
        <li
          key={item.name.id}
          className={classnames('edit-list-left-sidebar__item', {
            active: item?.active,
          })}
        >
          <a
            className="edit-list-left-sidebar__item-link"
            role="button"
            onClick={onItemClick(item)}
          >
            <FormattedMessage {...item.name} />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

SidebarDesktop.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default SidebarDesktop;
