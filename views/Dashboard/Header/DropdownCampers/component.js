import { Select } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Option from './Option';

const DropdownCampers = ({
  items,
  hasOneLastCamperEdit,
  currentCamperId,
  isLoading,
  handlerSelect,
}) => (
  <Select
    id="master-view-select"
    name="fieldName"
    className={classNames('main-input__field d-none d-lg-block', {
      'main-input__field__select-load': isLoading,
    })}
    optionLabelProp="label"
    defaultValue="master-view"
    value={currentCamperId}
    onSelect={handlerSelect}
    disabled={hasOneLastCamperEdit || isLoading}
    loading={isLoading}
    getPopupContainer={() => document.querySelector('.main-account-header')}
  >
    {items.map(Option)}
  </Select>
);

DropdownCampers.defaultProps = {
  isLoading: false,
};

DropdownCampers.propTypes = {
  isLoading: PropTypes.bool,
  hasOneLastCamperEdit: PropTypes.bool.isRequired,
  handlerSelect: PropTypes.func.isRequired,
  currentCamperId: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default DropdownCampers;
