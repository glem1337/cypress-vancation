import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, Row, Form, Skeleton } from 'antd';

import { TYPE_DELIVERY } from 'constants/mapbox';
import ProgressBar from 'views/shared/ProgressBar';
import AddNewCamperBtnForm from 'views/shared/AddNewCamperBtnForm';
import Map from 'views/shared/Delivery/Map';
import Pickup from 'views/shared/Delivery/Pickup';
import Rate from 'views/shared/Delivery/Rate';

import EstimatedEarningCard from '../EstimatedEarningCard';

const Delivery = ({
  onBackButtonClick,
  handlerPickup,
  handlerRate,
  isLoading,
  handleSubmit,
  isFormValid,
  values,
  camper,
  camperCompleteness,
  isCamperExist,
}) => {
  if (!isCamperExist) {
    return (
      <Row>
        <Col span={24} className="d-flex justify-content-center">
          <div className="main-listing-container">
            <div className="mb-16 mb-md-24">
              <ProgressBar
                content={<FormattedMessage id="addNewCamper.ProgressBar" />}
                percent={camperCompleteness}
              />
            </div>
            <Row gutter={24}>
              <Col lg={24}>
                <h1 className="text-headline mb-8">
                  <FormattedMessage id="addNewCamper.delivery.willYouOfferDelivery" />
                </h1>
              </Col>
              <Col lg={24}>
                <Skeleton />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <div className="main-listing-delivery__wrapper">
      <Row className="d-block">
        <Col span={24} className="d-flex justify-content-center">
          <div className="main-listing-container main-listing-delivery__container">
            <div className="mb-16 mb-md-24">
              <ProgressBar
                content={<FormattedMessage id="addNewCamper.ProgressBar" />}
                percent={camperCompleteness}
              />
            </div>
            <Form layout="vertical">
              <Row gutter={24}>
                <Col lg={24}>
                  <h1 className="text-headline mb-8">
                    <FormattedMessage id="addNewCamper.delivery.willYouOfferDelivery" />
                  </h1>
                  <p className="mb-24">
                    <FormattedMessage id="addNewCamper.delivery.ifYouOfferDelivery" />
                  </p>
                </Col>
                <Pickup
                  isLoading={isLoading}
                  rate={values.rate}
                  pickup={values.pickup}
                  handlerRate={handlerRate}
                  handlerPickup={handlerPickup}
                />
                <Col lg={24}>
                  <Rate
                    isLoading={isLoading}
                    hide={!values.pickup || values.rate === TYPE_DELIVERY[0]}
                  />
                </Col>
              </Row>
            </Form>
            <AddNewCamperBtnForm
              withBackBtn
              onBackClick={onBackButtonClick}
              onSaveClick={handleSubmit}
              isSubmitting={isLoading}
              canSave={isFormValid && !isLoading}
              showGradientButton={isFormValid}
            />
          </div>
        </Col>
      </Row>
      <Map
        hide={!values.pickup}
        camper={camper}
        radius={values.distance}
      />
      <EstimatedEarningCard isSlim />
    </div>
  );
};

Delivery.defaultProps = {
  isLoading: false,
  camper: null,
};

Delivery.propTypes = {
  isLoading: PropTypes.bool,
  isFormValid: PropTypes.bool.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  values: PropTypes.shape({
    pickup: PropTypes.bool.isRequired,
    rate: PropTypes.oneOf(TYPE_DELIVERY).isRequired,
    distance: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
  }).isRequired,
  camper: PropTypes.shape({
    specificationDetail: PropTypes.shape(),
  }),
  handlerPickup: PropTypes.func.isRequired,
  handlerRate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  camperCompleteness: PropTypes.number.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
};

export default Delivery;
