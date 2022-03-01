import { FormattedMessage } from 'react-intl';
import {
 Col, Input, Row, Form, Skeleton,
} from 'antd';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import { FORM_VALIDATION } from 'constants/camper';
import AddNewCamperBtnForm from 'views/shared/AddNewCamperBtnForm';
import ProgressBar from 'views/shared/ProgressBar';
import InputField from 'views/shared/InputField';
import EstimatedEarningCard from '../EstimatedEarningCard/container';

const ListingDetails = ({
  values,
  handleSubmit,
  onBackButtonClick,
  isCamperExist,
  camperCompleteness,
  canSaveAndContinue,
}) => {
  if (!isCamperExist) {
    return (
      <div className="main-listing-container">
        <div className="mb-16 mb-md-24">
          <ProgressBar
            content={<FormattedMessage id="addNewCamper.ProgressBar" />}
            percent={camperCompleteness}
          />
        </div>
        <Row>
          <Col span={24}>
            <Skeleton active />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <>
      <div className="main-listing-container">
        <div className="mb-16 mb-md-24">
          <ProgressBar
            content={<FormattedMessage id="addNewCamper.ProgressBar" />}
            percent={camperCompleteness}
          />
        </div>
        <Form layout="vertical">
          <Row>
            <Col span={24}>
              <h1 className="text-headline mb-8">
                <FormattedMessage id="addNewCamper.form.listingName.title" />
              </h1>
              <p className="mb-16">
                <FormattedMessage id="addNewCamper.form.listingName.subTitle" />
              </p>
            </Col>
            <Col span={24}>
              <Row>
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
                    placeholder={{ id: 'addNewCamper.form.listingDescription.placeholder' }}
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
            </Col>
          </Row>
        </Form>
        <EstimatedEarningCard isSlim />
      </div>
      <AddNewCamperBtnForm
        withBackBtn
        canSave={canSaveAndContinue}
        onSaveClick={handleSubmit}
        onBackClick={onBackButtonClick}
        showGradientButton={canSaveAndContinue}
      />
    </>
  );
};

ListingDetails.propTypes = {
  values: PropTypes.shape().isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  camperCompleteness: PropTypes.number.isRequired,
  canSaveAndContinue: PropTypes.bool.isRequired,
};

export default ListingDetails;
