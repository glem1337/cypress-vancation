import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'antd';
import { Field } from 'formik';

import InputField from 'views/shared/InputField';
import TooltipIcon from 'views/shared/TooltipIcon';

const DumpingSection = ({ formatMessage }) => (
  <Row gutter={24}>
    <Col lg={16}>
      <div className="mb-8 text-subheader font-700">
        <FormattedMessage id="addNewCamper.tripFees.title" />
      </div>
      <p className="mb-16">
        <FormattedMessage id="dashboard.editCamper.tripFees.dumping.description" />
      </p>
      <Row gutter={[24, 16]}>
        <Col md={12}>
          <div className="main-input-wrap-addtxt d-flex align-items-center">
            <div className="flex-grow-1">
              <Field
                type="number"
                name="dumpingFee"
                prefix="$"
                component={InputField}
                label={{
                  id: 'dashboard.editCamper.tripFees.dumping.dumpingFee.label',
                }}
                formItemClasses="mb-0"
              />
            </div>
            <TooltipIcon
              className="edit-list__float-tooltip"
              iconClass="icon-info-f"
              phrase={formatMessage({
                id: 'dashboard.editCamper.tripFees.dumping.dumpingFee.tooltip',
              })}
            />
          </div>
        </Col>
        <div className="w-100" />
        <Col md={12}>
          <div className="main-input-wrap-addtxt">
            <Field
              type="number"
              name="flue"
              prefix="$"
              component={InputField}
              label={{
                id: 'dashboard.editCamper.tripFees.dumping.flue.label',
              }}
              formItemClasses="mb-0"
            >
              <span className="main-input__add-txt">
                <FormattedMessage id="shared.perQuarterTank" />
              </span>
            </Field>
          </div>
        </Col>
        <div className="w-100" />
        <Col md={12}>
          <div className="main-input-wrap-addtxt d-flex align-items-center">
            <div className="flex-grow-1">
              <Field
                type="number"
                name="lateDropOff"
                prefix="$"
                component={InputField}
                label={{
                  id: 'dashboard.editCamper.tripFees.dumping.lateDropOff.label',
                }}
                formItemClasses="mb-0"
              >
                <span className="main-input__add-txt">
                  <FormattedMessage id="addNewCamper.tripFees.perHour" />
                </span>
              </Field>
            </div>
            <TooltipIcon
              className="edit-list__float-tooltip"
              iconClass="icon-info-f"
              phrase={formatMessage({
                id: 'dashboard.editCamper.tripFees.dumping.lateDropOff.tooltip',
              })}
            />
          </div>
        </Col>
      </Row>
    </Col>
  </Row>
);

DumpingSection.propTypes = {
  formatMessage: PropTypes.func.isRequired,
};

export default DumpingSection;
