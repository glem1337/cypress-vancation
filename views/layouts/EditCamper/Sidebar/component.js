import PropTypes from 'prop-types';
import SidebarDesktop from './component.desktop';
import SidebarMobile from './component.mobile';

const Sidebar = ({
  items,
  onItemClick,
  onSidebarMobileChange,
  activeItemSlug,
}) => (
  <>
    <SidebarDesktop items={items} onItemClick={onItemClick} />
    <SidebarMobile
      activeItemSlug={activeItemSlug}
      items={items}
      onChange={onSidebarMobileChange}
    />
  </>
);

Sidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onItemClick: PropTypes.func.isRequired,
  onSidebarMobileChange: PropTypes.func.isRequired,
  activeItemSlug: PropTypes.string.isRequired,
};

export default Sidebar;
