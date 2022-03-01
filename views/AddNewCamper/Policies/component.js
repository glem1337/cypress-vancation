import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
 Col, Divider, Form, Radio, Row, Tag, Skeleton,
} from 'antd';
import { Field } from 'formik';

import { POLICIES_FORM_VALUES } from 'constants/camper';

import ProgressBar from 'views/shared/ProgressBar';
import TooltipIcon from 'views/shared/TooltipIcon';
import AddNewCamperBtnForm from 'views/shared/AddNewCamperBtnForm';
import RadioGroupField from 'views/shared/RadioGroupField';
import EstimatedEarningCard from '../EstimatedEarningCard';

const Policies = ({
  onBackButtonClick,
  intl: { formatMessage },
  isSubmitting,
  handleSubmit,
  isCamperExist,
  camperCompleteness,
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
            <h1 className="text-headline mb-8">
              <FormattedMessage id="addNewCamper.policies.title" />
            </h1>
          </Col>
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
                <FormattedMessage id="addNewCamper.policies.title" />
              </h1>
              <p className="mb-24">
                <FormattedMessage id="addNewCamper.policies.subTitle" />
              </p>
              <div className="mb-24 text-subheader font-700">
                <FormattedMessage id="addNewCamper.policies.bookingTitle" />
              </div>
            </Col>
            <Col>
              <Row>
                <Col lg={12}>
                  <Form.Item>
                    <Field
                      name="booking_approval_policy"
                      component={RadioGroupField}
                      radioGroupProps={{
                        size: 'large',
                      }}
                    >
                      <Radio
                        value={POLICIES_FORM_VALUES.INSTANT_BOOK}
                        className="main-listing-radio"
                      >
                        <span>
                          <span className="main-listing-radio__title">
                            <i className="icon icon-flash-f in-yellow-1000 mr-12" />
                            <div className="d-inline-flex align-items-center flex-wrap">
                              <span className="mr-8">
                                <FormattedMessage id="addNewCamper.policies.instantBookTitle" />
                              </span>
                              <Tag
                                className="mt-8 mt-md-0 ml-0"
                                color="cyan"
                                icon={<i className="icon icon-like-f" />}
                              >
                                <FormattedMessage id="shared.vancationRecommended" />
                              </Tag>
                            </div>
                          </span>
                          <p className="text-body">
                            <FormattedMessage id="addNewCamper.policies.instantBookDescription" />
                          </p>
                        </span>
                      </Radio>
                      <Radio
                        value={POLICIES_FORM_VALUES.REVIEW}
                        className="main-listing-radio"
                      >
                        <span>
                          <span className="main-listing-radio__title">
                            <FormattedMessage id="addNewCamper.policies.reviewTitle" />
                          </span>
                          <p className="text-body">
                            <FormattedMessage id="addNewCamper.policies.reviewDescription" />
                          </p>
                        </span>
                      </Radio>
                    </Field>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Divider />
            <div className="mb-24 text-subheader font-700">
              <FormattedMessage id="addNewCamper.policies.cancellationTitle" />
              <TooltipIcon
                phrase={formatMessage({
                  id: 'addNewCamper.policies.cancellationTooltip',
                })}
                iconClass="icon-info-f font-24"
              />
            </div>
            <Col>
              <Row>
                <Col lg={12}>
                  <Form.Item>
                    <Field
                      name="cancellation_policy"
                      component={RadioGroupField}
                      radioGroupProps={{
                        size: 'large',
                      }}
                    >
                      <Radio
                        value={POLICIES_FORM_VALUES.EASY_GOING}
                        className="main-listing-radio"
                      >
                        <span>
                          <span className="main-listing-radio__title">
                            <div className="d-inline-flex align-items-center flex-wrap">
                              <span className="mr-32 mr-md-8">
                                <FormattedMessage id="addNewCamper.policies.easyTitle" />
                              </span>
                              <Tag
                                className="ml-0"
                                color="cyan"
                                icon={<i className="icon icon-like-f" />}
                              >
                                <FormattedMessage id="shared.vancationRecommended" />
                              </Tag>
                            </div>
                          </span>
                          <p className="text-body">
                            <FormattedMessage id="addNewCamper.policies.easyDescription" />
                          </p>
                        </span>
                      </Radio>
                      <Radio
                        value={POLICIES_FORM_VALUES.FIRM_BUT_FAIR}
                        className="main-listing-radio"
                      >
                        <span>
                          <span className="main-listing-radio__title">
                            <FormattedMessage id="addNewCamper.policies.firmTitle" />
                          </span>
                          <p className="text-body">
                            <FormattedMessage id="addNewCamper.policies.firmDescription" />
                          </p>
                        </span>
                      </Radio>
                      <Radio
                        value={POLICIES_FORM_VALUES.BY_THE_BOOK}
                        className="main-listing-radio"
                      >
                        <span>
                          <span className="main-listing-radio__title">
                            <FormattedMessage id="addNewCamper.policies.bookTitle" />
                          </span>
                          <p className="text-body">
                            <FormattedMessage id="addNewCamper.policies.bookDescription" />
                          </p>
                        </span>
                      </Radio>
                    </Field>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        <EstimatedEarningCard isSlim />
      </div>
      <AddNewCamperBtnForm
        canSave={!isSubmitting}
        isSubmitting={isSubmitting}
        onBackClick={onBackButtonClick}
        withBackBtn
        onSaveClick={handleSubmit}
      />
    </>
  );
};

Policies.propTypes = {
  onBackButtonClick: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  camperCompleteness: PropTypes.number.isRequired,
};

export default Policies;
