import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Col, Row, Alert } from 'antd';
import PropTypes from 'prop-types';

import InputField from 'views/shared/InputField';
import isPresent from 'utils/isPresent';

const CleaningsSection = ({ cleaningAndPreparationFee }) => (
  <Row gutter={24}>
    <Col lg={16}>
      <h1 className="text-headline mb-8">
        <FormattedMessage id="addNewCamper.tripFees.title" />
      </h1>
      <p className="mb-24">
        <FormattedMessage id="addNewCamper.tripFees.subTitle" />
      </p>
      <div className="mb-8 text-subheader font-700">
        <FormattedMessage id="addNewCamper.tripFees.cleaning.title" />
      </div>
      <p className="mb-16">
        <FormattedMessage id="addNewCamper.tripFees.cleaning.subTitle" />
      </p>
    </Col>
    <div className="w-100" />
    <Col md={12} lg={8}>
      <div className="main-input-wrap-addtxt">
        <Field
          name="cleaningAndPreparationFee"
          id="cleaningAndPreparationFee"
          component={InputField}
          label={{ id: 'addNewCamper.tripFees.cleaning.label' }}
          type="number"
          prefix="$"
          placeholder="0"
          formItemClasses="mb-0"
        />
      </div>
    </Col>
    {isPresent(cleaningAndPreparationFee) && (
      <>
        <div className="w-100" />
        <Col md={20} lg={14}>
          <Alert
            type="warning"
            className="mt-16 mb-0"
            showIcon
            icon={<i className="icon icon-alert" />}
            message={
              <FormattedMessage id="addNewCamper.tripFees.cleaning.advice" />
            }
          />
        </Col>
      </>
    )}
  </Row>
);

CleaningsSection.propTypes = {
  cleaningAndPreparationFee: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default CleaningsSection;
