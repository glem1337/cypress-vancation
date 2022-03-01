import { Collapse } from 'antd';
import PropTypes from 'prop-types';

import { MOBILE_DROPDOWN_CAMPERS_ID } from 'constants/dashboard';

import Item from './Item';

const ListCampersMobile = ({
  items,
  handlerClick,
  selectedCamper,
  activeKey,
  onCollapseChangeHandler,
}) => (
  <Collapse
    activeKey={activeKey}
    onChange={onCollapseChangeHandler}
    className="master-view__menu"
    ghost
  >
    <Collapse.Panel
      header={<Item {...selectedCamper} showArrow />}
      showArrow={false}
      key={MOBILE_DROPDOWN_CAMPERS_ID}
    >
      <ul className="master-view__menu-list">
        {items.map((item) => (
          <Item key={item.id} {...item} handlerClick={handlerClick(item.id)} />
        ))}
      </ul>
    </Collapse.Panel>
  </Collapse>
);

ListCampersMobile.propTypes = {
  activeKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handlerClick: PropTypes.func.isRequired,
  onCollapseChangeHandler: PropTypes.func.isRequired,
  selectedCamper: PropTypes.shape().isRequired,
};

export default ListCampersMobile;
