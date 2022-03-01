import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  Divider,
  Form,
  Radio,
  Row,
  Tag,
  Skeleton,
  Alert,
  Input,
} from 'antd';
import { Field } from 'formik';

import {
  POLICIES_FORM_NOTICE_OPTIONS,
  POLICIES_FORM_VALUES,
} from 'constants/camper';

import EditCamperLayout from 'views/layouts/EditCamper';
import TooltipIcon from 'views/shared/TooltipIcon';
import RadioGroupField from 'views/shared/RadioGroupField';
import SwitchField from 'views/shared/SwitchField';
import SelectField from 'views/AddNewCamper/CamperDetails/SelectField';

const Policies = ({
  intl: { formatMessage },
  isValid,
  isLoading,
  submitHandler,
  requestNoticeChangeHandler,
  onReviewSelectHandler,
  isCamperExist,
  leavePagePrepare,
  camperPolicy: { deposit },
  values: { requestNotice, bookingApprovalPolicy },
}) => (
  <EditCamperLayout
    hasFooter
    canSave={isValid && !isLoading}
    onSave={submitHandler}
    isLoading={isLoading}
    leavePageMethod={leavePagePrepare}
  >
    <div className="container">
      <Row>
        <Col span={24}>
          <h1 className="text-headline mb-8">
            <FormattedMessage id="dashboard.editCamper.policies.title" />
          </h1>
          <p className="mb-24">
            <FormattedMessage id="addNewCamper.policies.subTitle" />
          </p>
        </Col>
      </Row>
      {isCamperExist ? (
        <Form layout="vertical">
          <Row>
            <div className="mb-24 text-subheader font-700">
              <FormattedMessage id="addNewCamper.policies.bookingTitle" />
            </div>
            <Col>
              <Row>
                <Col lg={12}>
                  <Form.Item>
                    <Field
                      name="bookingApprovalPolicy"
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
                      {bookingApprovalPolicy
                        === POLICIES_FORM_VALUES.INSTANT_BOOK && (
                        <div className="ml-24 ml-mb-40">
                          <Form.Item className="main-input--height-auto mb-8">
                            <Field
                              name="requestNotice"
                              component={SwitchField}
                              onToggle={requestNoticeChangeHandler}
                            />
                            <span className="ml-8">
                              <FormattedMessage id="dashboard.editCamper.requestNotice.title" />
                            </span>
                          </Form.Item>
                          <p className="mb-16 text-body line-height-base">
                            <FormattedMessage id="dashboard.editCamper.requestNotice.description" />
                          </p>
                          {requestNotice && (
                            <>
                              <Row>
                                <Col md={16}>
                                  <Field
                                    id="autoBlockedDays"
                                    name="autoBlockedDays"
                                    className="main-input__field"
                                    optionLabelProp="label"
                                    component={SelectField}
                                    label={{ id: 'shared.days' }}
                                    items={POLICIES_FORM_NOTICE_OPTIONS}
                                  />
                                </Col>
                              </Row>
                              <Alert
                                type="warning"
                                className="mb-24"
                                showIcon
                                icon={<i className="icon icon-alert" />}
                                message={formatMessage({
                                  id: 'dashboard.editCamper.noticeDays.warning',
                                })}
                              />
                            </>
                          )}
                        </div>
                      )}
                      <Radio
                        value={POLICIES_FORM_VALUES.REVIEW}
                        className="main-listing-radio"
                        onChange={onReviewSelectHandler}
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
                      name="cancellationPolicy"
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
            <Divider />
            <div className="mb-8 text-subheader font-700">
              <FormattedMessage id="addNewCamper.insurance.refundable.title" />
            </div>
            <Col span={24}>
              <Row>
                <Col md={16}>
                  <p className="mb-16">
                    <FormattedMessage id="dashboard.editCamper.deposit.description" />
                  </p>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col md={12} lg={8}>
                  <div className="mb-8">
                    <Form.Item
                      label={(
                        <span className="main-input__label">
                          <FormattedMessage id="dashboard.editCamper.deposit.label" />
                        </span>
                      )}
                    >
                      <Input type="text" value={`$${deposit}`} />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      ) : (
        <Skeleton active />
      )}
    </div>
  </EditCamperLayout>
);

Policies.defaultProps = {
  isLoading: false,
};

Policies.propTypes = {
  camperPolicy: PropTypes.shape().isRequired,
  values: PropTypes.shape().isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  submitHandler: PropTypes.func.isRequired,
  requestNoticeChangeHandler: PropTypes.func.isRequired,
  onReviewSelectHandler: PropTypes.func.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
  leavePagePrepare: PropTypes.func.isRequired,
};

export default Policies;
