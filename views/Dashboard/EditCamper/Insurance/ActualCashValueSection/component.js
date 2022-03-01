import PropTypes from 'prop-types';
import { Alert, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';

import isPresent from 'utils/isPresent';

import TooltipIcon from 'views/shared/TooltipIcon';
import InputField from 'views/shared/InputField/container';

const ActualCashValueSection = ({ actualCashValue }) => (
  <>
    <Col md={12} lg={8}>
      <h2 className="d-flex align-items-center text-subheader mb-16">
        <FormattedMessage id="dashboard.editCamper.insurance.actualCashValue.title" />
        <TooltipIcon
          phrase={
            <FormattedMessage id="dashboard.editCamper.insurance.actualCashValue.tooltip" />
          }
          iconClass="icon-info-f"
        />
      </h2>
      <div className="main-input-wrap-addtxt">
        <Field
          type="number"
          id="actualCashValue"
          name="actualCashValue"
          prefix="$"
          component={InputField}
        />
      </div>
    </Col>
    {isPresent(actualCashValue) && (
      <>
        <div className="w-100" />
        <Col lg={16}>
          <Alert
            className="mb-0"
            type="warning"
            showIcon
            icon={<i className="icon icon-idea" />}
            message={
              <FormattedMessage id="dashboard.editCamper.insurance.actualCashValue.alert" />
            }
          />
        </Col>
      </>
    )}
  </>
);

ActualCashValueSection.defaultProps = {
  actualCashValue: null,
};

ActualCashValueSection.propTypes = {
  actualCashValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ActualCashValueSection;
