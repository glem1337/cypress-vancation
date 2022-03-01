import { Button, Radio } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';

import { CAMPER_STATUS } from 'constants/camper';
import { FILTER_TITLE_BY_STATUS } from 'constants/dashboardAllCampers';

import Dropdown from 'views/shared/Dropdown';
import RadioGroupField from 'views/shared/RadioGroupField';

const FilterStatus = ({ onStatusChange, status }) => (
  <Dropdown
    className="ml-8 master-view-filter-wrap"
    overlayClassName="min-w-180"
    icon={(
      <div>
        <Button
          className="d-none d-md-block"
          icon={<i className="icon icon-filter mr-8 in-gray-500" />}
          size="large"
          type={status === CAMPER_STATUS.ALL ? 'text' : 'secondary'}
        >
          <span className="in-gray-700">
            <FormattedMessage {...FILTER_TITLE_BY_STATUS[status]} />
          </span>
        </Button>
        <Button
          className="d-md-none"
          size="large"
          type={status === CAMPER_STATUS.ALL ? 'text' : 'secondary'}
          icon={<i className="icon icon-filter in-gray-500" />}
        />
      </div>
    )}
    placement="bottomRight"
  >
    <div className="main-dropdown-wrap">
      <div className="main-dropdown__body">
        <div className="main-dropdown__item-title">
          <FormattedMessage id="dashboard.allCampers.filterByStatus.title" />
        </div>
        <Field
          name="status"
          component={RadioGroupField}
          radioGroupProps={{
            size: 'large',
            className: 'w-100',
            onChange: onStatusChange,
          }}
        >
          <div className="main-dropdown__item">
            <Radio value={CAMPER_STATUS.ALL}>
              <span className="ml-12">
                <FormattedMessage id="shared.all" />
              </span>
            </Radio>
          </div>
          <div className="main-dropdown__item">
            <Radio value={CAMPER_STATUS.PUBLISHED}>
              <span className="ml-12">
                <FormattedMessage id="shared.published" />
              </span>
            </Radio>
          </div>
          <div className="main-dropdown__item">
            <Radio value={CAMPER_STATUS.UNPUBLISHED}>
              <span className="ml-12">
                <FormattedMessage id="shared.unpublished" />
              </span>
            </Radio>
          </div>
          <div className="main-dropdown__item">
            <Radio value={CAMPER_STATUS.ON_MODERATION}>
              <span className="ml-12">
                <FormattedMessage id="shared.onModeration" />
              </span>
            </Radio>
          </div>
          <div className="main-dropdown__item">
            <Radio value={CAMPER_STATUS.DRAFT}>
              <span className="ml-12">
                <FormattedMessage id="shared.draft" />
              </span>
            </Radio>
          </div>
          <div className="main-dropdown__item">
            <Radio value={CAMPER_STATUS.DEACTIVATED}>
              <span className="ml-12">
                <FormattedMessage id="shared.deactivated" />
              </span>
            </Radio>
          </div>
        </Field>
      </div>
    </div>
  </Dropdown>
);

FilterStatus.propTypes = {
  onStatusChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default FilterStatus;
