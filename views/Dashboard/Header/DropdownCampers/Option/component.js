import { Select } from 'antd';
import PropTypes from 'prop-types';

import { DASHBOARD_CAMPER_MASTER_VIEW_ITEM } from 'constants/dashboard';
import FormattedOrRawMessage from 'views/shared/FormattedOrRawMessage';

const Option = ({
  img,
  id,
  label,
  subtitle,
}) => (
  <Select.Option
    key={id}
    value={id}
    label={<FormattedOrRawMessage message={label} />}
  >
    <li className="main-dropdown__item p-0">
      {id === DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id ? (
        <div className="main-dropdown__item-pic-listing">
          <i className="icon icon-file-list in-black" />
        </div>
      ) : (
        <div
          className="main-dropdown__item-pic-listing"
          style={{ backgroundImage: `url("${img}")` }}
        />
      )}
      <div className="d-flex justify-content-center flex-column line-height-base overflow-hidden">
        <span className="overflow-hidden text-overflow-ellipsis">
          <FormattedOrRawMessage message={label} />
        </span>
        {subtitle && (
          <span className="font-style-italic">
            {subtitle}
          </span>
        )}
      </div>
    </li>
  </Select.Option>
);
Option.defaultProps = {
  subtitle: undefined,
};

Option.propTypes = {
  img: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  subtitle: PropTypes.string,
};

export default Option;
