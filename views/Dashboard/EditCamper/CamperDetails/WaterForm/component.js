import { Col, Row } from 'antd';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import InputField from 'views/shared/InputField';
import TooltipIcon from 'views/shared/TooltipIcon';

const WaterForm = ({ isSubmitting, formatMessage }) => (
  <Row gutter={24}>
    <Col md={12}>
      <div className="main-input-wrap-addtxt">
        <Field
          type="number"
          id="freshWater"
          name="freshWater"
          className="main-input__field"
          component={InputField}
          disabled={isSubmitting}
          label={{ id: 'addNewCamper.camperDetails.form.freshWater.title' }}
        >
          <span className="main-input__add-txt">
            <FormattedMessage id="addNewCamper.camperDetails.form.water.dimension" />
          </span>
        </Field>
      </div>
    </Col>
    <Col md={12}>
      <div className="d-flex align-items-center relative">
        <div className="main-input-wrap-addtxt flex-grow-1">
          <Field
            type="number"
            id="grayWater"
            name="grayWater"
            className="main-input__field"
            component={InputField}
            disabled={isSubmitting}
            label={{ id: 'addNewCamper.camperDetails.form.grayWater.title' }}
          >
            <span className="main-input__add-txt">
              <FormattedMessage id="addNewCamper.camperDetails.form.water.dimension" />
            </span>
          </Field>
          <TooltipIcon
            className="edit-list__float-tooltip"
            iconClass="icon-info-f"
            phrase={formatMessage({
              id: 'addNewCamper.camperDetails.form.grayWater.tooltip',
            })}
          />
        </div>
      </div>
    </Col>
  </Row>
);

WaterForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  formatMessage: PropTypes.func.isRequired,
};

export default WaterForm;
