import { Row, Col, Select } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const SidebarMobile = ({ items, onChange, activeItemSlug }) => (
  <div className="edit-list-left-sidebar-tab">
    <Row>
      <Col md={12}>
        <Select
          onChange={onChange}
          className="main-input__field"
          optionLabelProp="label"
          value={activeItemSlug}
        >
          {items.map((item) => (
            <Select.Option
              key={item.name.id}
              className="p-0"
              value={item.slug}
              label={<FormattedMessage {...item.name} />}
            >
              <li className="main-dropdown__item">
                <FormattedMessage {...item.name} />
              </li>
            </Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  </div>
);

SidebarMobile.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onChange: PropTypes.func.isRequired,
  activeItemSlug: PropTypes.string.isRequired,
};

export default SidebarMobile;
