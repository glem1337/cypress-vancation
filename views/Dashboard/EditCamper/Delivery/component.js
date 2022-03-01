import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, Row, Form, Skeleton } from 'antd';

import { TYPE_DELIVERY } from 'constants/mapbox';
import EditCamperLayout from 'views/layouts/EditCamper';

import Map from 'views/shared/Delivery/Map';
import Pickup from 'views/shared/Delivery/Pickup';
import Rate from 'views/shared/Delivery/Rate';

const Delivery = ({
  handlerPickup,
  handlerRate,
  isLoading,
  handleSubmit,
  values,
  camper,
  isCamperExist,
  leavePagePrepare,
  isValid,
}) => {
  if (!isCamperExist) {
    return (
      <EditCamperLayout
        onSave={handleSubmit}
        isLoading={isLoading}
        hasFooter={false}
        leavePageMethod={leavePagePrepare}
      >
        <div className="container">
          <Skeleton active />
        </div>
      </EditCamperLayout>
    );
  }

  return (
    <EditCamperLayout
      hasFooter
      onSave={handleSubmit}
      isLoading={isLoading}
      canSave={!isLoading}
      leavePageMethod={leavePagePrepare}
      showGradientButton={isValid}
    >
      <div className="container">
        <div className="main-listing-delivery__wrapper">
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
          <Map
            hide={!values.pickup}
            camper={camper}
            radius={values.distance}
          />
        </div>
      </div>
    </EditCamperLayout>
  );
};

Delivery.defaultProps = {
  isLoading: false,
  camper: null,
};

Delivery.propTypes = {
  isLoading: PropTypes.bool,
  values: PropTypes.shape().isRequired,
  camper: PropTypes.shape(),
  handlerPickup: PropTypes.func.isRequired,
  handlerRate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  leavePagePrepare: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default Delivery;
