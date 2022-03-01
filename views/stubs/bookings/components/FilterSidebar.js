import {
  Button, Checkbox, Divider, Select, Drawer,
} from 'antd';
import PropTypes from 'prop-types';
import MainBtnGradient from '../../shared/buttons/MainBtnGradient';

const { Option } = Select;

const statusArr = ['All', 'Current', 'Upcoming', 'Pending', 'Past', 'Canceled', 'Inquiry'];
const listingArr = ['All', 'Forest River Grey Wolf 2020 Ford Econoline…', 'Adventure Ready Class B Camper: 2020 Merc...', 'Forest River Grey Wolf 2020 Ford Econoline…'];

const FilterSidebar = ({ isVisible, changeFilterState }) => (
  <Drawer
    className="chat-filter-sidebar"
    title={(
      <div className="d-flex align-items-center">
        <p className="mr-12 text-title">
          Filter
        </p>
        <Button
          type="simple-text"
        >
          Clear filters
        </Button>
        <Button
          className="ml-auto"
          type="secondary"
          size="large"
          shape="circle"
          icon={<i className="icon icon-cross" />}
          onClick={() => changeFilterState()}
        />
      </div>
    )}
    placement="left"
    visible={isVisible}
    onClose={() => changeFilterState()}
  >
    <div>
      <p className="text-caption mb-8 in-gray-700 font-600">
        By status
      </p>
      {statusArr.map((item) => (
        <div className="chat-filter-sidebar__item">
          <Checkbox>
            {item}
          </Checkbox>
        </div>
      ))}
    </div>
    <Divider className="mt-16 mb-16" />
    <div>
      <p className="text-caption mb-8 in-gray-700 font-600">
        By listing
      </p>
      {/* TODO: Truncate this text */}
      {listingArr.map((item) => (
        <div className="chat-filter-sidebar__item">
          <Checkbox>
            {item}
          </Checkbox>
        </div>
      ))}
    </div>
    <Divider className="mt-16 mb-16" />
    <p className="text-caption mb-8 in-gray-700 font-600">
      By city
    </p>
    <Select
      id="city"
      name="fieldName"
      className="main-input__field mb-24"
      optionLabelProp="label"
      placeholder="Select city"
    >
      <Option className="p-0" value="select1" label="+1">
        <li className="main-dropdown__item">New-York</li>
      </Option>
      <Option className="p-0" value="select2" label="+2">
        <li className="main-dropdown__item">Washington</li>
      </Option>
    </Select>
    <MainBtnGradient
      className="w-100 mt-auto flex-shrink-0"
      size="large"
      text="Apply"
    />
  </Drawer>
);

FilterSidebar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  changeFilterState: PropTypes.func.isRequired,
};

export default FilterSidebar;
