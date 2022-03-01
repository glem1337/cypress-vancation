import { FormattedMessage } from 'react-intl';
import {
 Col, Input, Row, Form, Skeleton,
} from 'antd';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import { FORM_VALIDATION } from 'constants/camper';

import InputField from 'views/shared/InputField';
import EditCamperLayout from 'views/layouts/EditCamper';

const Details = ({
  values,
  handleSubmit,
  canSaveAndContinue,
  isLoading,
  isCamperExist,
  leavePagePrepare,
}) => (
  <EditCamperLayout
    hasFooter
    canSave={canSaveAndContinue}
    onSave={handleSubmit}
    isLoading={isLoading}
    leavePageMethod={leavePagePrepare}
  >
    <div className="container">
      <Row gutter={24}>
        <Col span={24}>
          <h1 className="text-headline mb-8">
            <FormattedMessage id="addNewCamper.form.listingName.title" />
          </h1>
          <p className="mb-16">
            <FormattedMessage id="addNewCamper.form.listingName.subTitle" />
          </p>
        </Col>
        <Col span={24}>
          {isCamperExist ? (
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={16}>
                  <Field
                    name="listingName"
                    id="listingName"
                    className="main-input__field"
                    component={InputField}
                    tooltip={{
                      id: 'validations.characterCurrentMax',
                      values: {
                        current: values.listingName.length,
                        max: FORM_VALIDATION.MAX_LISTING_NAME,
                      },
                    }}
                    label={{ id: 'addNewCamper.form.listingName.label' }}
                    placeholder={{ id: 'shared.name' }}
                  />
                </Col>
                <Col lg={16}>
                  <Field
                    name="listingDescription"
                    id="listingDescription"
                    component={InputField}
                    asComponent={Input.TextArea}
                    rows={4}
                    placeholder={{
                      id: 'addNewCamper.form.listingDescription.placeholder',
                    }}
                    label={{ id: 'addNewCamper.form.listingDescription.label' }}
                    tooltip={{
                      id: 'validations.characterCurrentMax',
                      values: {
                        current: values.listingDescription.length,
                        max: FORM_VALIDATION.MAX_LISTING_DESCRIPTION,
                      },
                    }}
                  />
                </Col>
              </Row>
            </Form>
          ) : (
            <Skeleton active />
          )}
        </Col>
      </Row>
    </div>
  </EditCamperLayout>
);

Details.defaultProps = {
  isLoading: false,
};

Details.propTypes = {
  values: PropTypes.shape().isRequired,
  handleSubmit: PropTypes.func.isRequired,
  leavePagePrepare: PropTypes.func.isRequired,
  canSaveAndContinue: PropTypes.bool.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

export default Details;
