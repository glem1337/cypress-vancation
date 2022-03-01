import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
 Alert, Col, Divider, Form, Row, Switch, Skeleton,
} from 'antd';
import { Field } from 'formik';
import classNames from 'classnames';

import {
  MINIMAL_NIGHT_STAY_OPTIONS,
  WEEK_NIGHT_PRICE_DAYS,
} from 'constants/camperPricing';

import ProgressBar from 'views/shared/ProgressBar';
import AddNewCamperBtnForm from 'views/shared/AddNewCamperBtnForm';
import InputField from 'views/shared/InputField';
import SelectField from 'views/AddNewCamper/CamperDetails/SelectField';
import EstimatedEarningCard from '../EstimatedEarningCard';

const Pricing = ({
  isLoading,
  isValid,
  handleSubmit,
  values,
  onBackButtonClick,
  onCustomizableNightCostChange,
  onWeeklyDiscountChange,
  onMonthlyDiscountChange,
  weeklyDiscountPercentPrice,
  monthlyDiscountPercentPrice,
  isCamperExist,
  camperCompleteness,
}) => {
  const { costomizialeNightCost, weeklyDiscount, monthlyDiscount } = values;

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
          <Col lg={16}>
            <h1 className="text-headline mb-8">
              <FormattedMessage id="addNewCamper.pricing.title" />
            </h1>
          </Col>
        </Row>
        <Row gutter={24}>
          <Skeleton active />
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
            <Col lg={16}>
              <h1 className="text-headline mb-8">
                <FormattedMessage id="addNewCamper.pricing.title" />
              </h1>
              <p className="mb-24">
                <FormattedMessage id="addNewCamper.pricing.subTitle" />
              </p>
              <Alert
                type="warning"
                className="mb-24"
                showIcon
                icon={<i className="icon icon-idea" />}
                message={<FormattedMessage id="addNewCamper.pricing.alert" />}
              />
            </Col>
            <Col span={24}>
              <Row>
                <Col md={12} lg={8}>
                  <div className="mb-16 text-subheader font-700">
                    <FormattedMessage id="addNewCamper.pricing.nightlyRateTitle" />
                  </div>
                  <div className="main-input-wrap-addtxt">
                    <Field
                      disabled={costomizialeNightCost}
                      type="number"
                      id="costPerNight"
                      name="costPerNight"
                      component={InputField}
                      prefix="$"
                      label={{ id: 'addNewCamper.pricing.costPerNight' }}
                    >
                      <span className="main-input__add-txt">
                        <FormattedMessage id="addNewCamper.pricing.perNight" />
                      </span>
                    </Field>
                  </div>
                  <div className="d-flex align-items-center mb-16">
                    <Switch
                      onChange={onCustomizableNightCostChange}
                      checked={costomizialeNightCost}
                    />
                    <span className="ml-8">
                      <FormattedMessage id="addNewCamper.pricing.customizeByNightOfTheWeek" />
                    </span>
                  </div>
                  {costomizialeNightCost
                    && WEEK_NIGHT_PRICE_DAYS.map(({ DAY, NAME }) => (
                      <div className="main-input-wrap-addtxt" key={NAME}>
                        <Field
                          type="number"
                          id={`weekNightPrice.${NAME}`}
                          name={`weekNightPrice.${NAME}`}
                          component={InputField}
                          prefix="$"
                          label={DAY}
                        >
                          <span className="main-input__add-txt">
                            <FormattedMessage id="addNewCamper.pricing.perNight" />
                          </span>
                        </Field>
                      </div>
                    ))}
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <Row>
                <Col md={12} lg={8}>
                  <div className="mb-8 text-subheader font-700">
                    <FormattedMessage id="addNewCamper.pricing.baseDiscountsTitle" />
                  </div>
                  <p className="mb-24">
                    <FormattedMessage id="addNewCamper.pricing.baseDiscountsSubTitle" />
                  </p>
                  <div className="d-flex align-items-center mb-8">
                    <Switch
                      onChange={onWeeklyDiscountChange}
                      checked={weeklyDiscount}
                    />
                    <span className="ml-8">
                      <FormattedMessage id="addNewCamper.pricing.offerWeeklyTitle" />
                    </span>
                  </div>
                  <p
                    className={classNames('text-caption', {
                      'mb-16': weeklyDiscount,
                      'mb-24': !weeklyDiscount,
                    })}
                  >
                    <FormattedMessage id="addNewCamper.pricing.offerWeeklySubTitle" />
                  </p>
                  {weeklyDiscount && (
                    <div className="main-input-wrap-addtxt main-input--has-message mb-20">
                      <Field
                        type="number"
                        id="weeklyDiscountPercent"
                        name="weeklyDiscountPercent"
                        component={InputField}
                        tooltip={{
                          id: 'addNewCamper.pricing.pricePerWeek',
                          values: { price: `$${weeklyDiscountPercentPrice}` },
                        }}
                      >
                        <span className="main-input__add-txt">%</span>
                      </Field>
                    </div>
                  )}
                  <div className="d-flex align-items-center mb-8">
                    <Switch
                      onChange={onMonthlyDiscountChange}
                      checked={monthlyDiscount}
                    />
                    <span className="ml-8">
                      <FormattedMessage id="addNewCamper.pricing.offerMonthlyTitle" />
                    </span>
                  </div>
                  <p
                    className={classNames('text-caption', {
                      'mb-16': monthlyDiscount,
                      'mb-24': !monthlyDiscount,
                    })}
                  >
                    <FormattedMessage id="addNewCamper.pricing.offerMonthlySubTitle" />
                  </p>
                  {monthlyDiscount && (
                    <div className="main-input-wrap-addtxt main-input--has-message mb-20">
                      <Field
                        type="number"
                        id="monthlyDiscountPercent"
                        name="monthlyDiscountPercent"
                        component={InputField}
                        tooltip={{
                          id: 'addNewCamper.pricing.pricePerMonth',
                          values: { price: `$${monthlyDiscountPercentPrice}` },
                        }}
                      >
                        <span className="main-input__add-txt">%</span>
                      </Field>
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <div className="mb-8 text-subheader font-700">
            <FormattedMessage id="addNewCamper.pricing.nightStayTitle" />
          </div>
          <p className="mb-16">
            <FormattedMessage id="addNewCamper.pricing.nightStaySubTitle" />
          </p>
          <div className="mb-36">
            <Row>
              <Col md={12} lg={8}>
                <Field
                  id="minimalNightStay"
                  name="minimalNightStay"
                  className="main-input__field"
                  optionLabelProp="label"
                  component={SelectField}
                  label={{ id: 'addNewCamper.pricing.nights' }}
                  items={MINIMAL_NIGHT_STAY_OPTIONS}
                />
              </Col>
            </Row>
          </div>
        </Form>
        <EstimatedEarningCard isSlim />
      </div>
      <AddNewCamperBtnForm
        showGradientButton={isValid}
        isSubmitting={isLoading}
        canSave={isValid && !isLoading}
        onBackClick={onBackButtonClick}
        onSaveClick={handleSubmit}
        withBackBtn
      />
    </>
  );
};

Pricing.defaultProps = {
  isLoading: false,
};

Pricing.propTypes = {
  values: PropTypes.shape({
    costomizialeNightCost: PropTypes.bool.isRequired,
    weeklyDiscount: PropTypes.bool.isRequired,
    monthlyDiscount: PropTypes.bool.isRequired,
    costPerNight: PropTypes.number.isRequired,
  }).isRequired,
  onCustomizableNightCostChange: PropTypes.func.isRequired,
  onWeeklyDiscountChange: PropTypes.func.isRequired,
  onMonthlyDiscountChange: PropTypes.func.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  weeklyDiscountPercentPrice: PropTypes.number.isRequired,
  monthlyDiscountPercentPrice: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  camperCompleteness: PropTypes.number.isRequired,
};

export default Pricing;
