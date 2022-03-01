import PropTypes from 'prop-types';
import {
 Col, Form, Radio, Row, Switch,
} from 'antd';
import Classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';

import { TYPE_DELIVERY } from 'constants/mapbox';
import InputField from 'views/shared/InputField/container';

const Pickup = ({
  rate,
  pickup,
  isLoading,
  handlerRate,
  handlerPickup,
}) => (
  <>
    <Col span={24}>
      <div className="d-flex align-items-center mb-16">
        <Switch
          name="pickup"
          checked={pickup}
          onChange={handlerPickup}
          disabled={isLoading}
        />
        <span className="ml-8">
          <FormattedMessage id="addNewCamper.delivery.iWantToOfferDelivery" />
        </span>
      </div>
    </Col>
    <Col
      span={24}
      className={Classnames({ 'd-none': !pickup, 'd-bloc': pickup })}
    >
      <Form.Item>
        <Radio.Group
          name="rate"
          size="large"
          value={rate}
          onChange={handlerRate}
          disabled={isLoading}
        >
          <div className="mb-20">
            <Radio value={TYPE_DELIVERY[0]}>
              <span className="ml-12">
                <FormattedMessage id="addNewCamper.delivery.freeDelivery" />
              </span>
            </Radio>
          </div>
          <div>
            <Radio value={TYPE_DELIVERY[1]}>
              <span className="ml-12">
                <FormattedMessage id="addNewCamper.delivery.setDeliveryRates" />
              </span>
            </Radio>
          </div>
        </Radio.Group>
      </Form.Item>
    </Col>
    <Col
      span={24}
      className={Classnames({ 'd-none': !pickup, 'd-bloc': pickup })}
    >
      <Row gutter={24}>
        <Col md={12} lg={8}>
          <Field
            type="number"
            name="distance"
            component={InputField}
            disabled={isLoading}
            label={{ id: 'addNewCamper.delivery.form.distance' }}
            placeholder={{ id: 'addNewCamper.delivery.form.distance' }}
            suffix={<span className="in-gray-700"><FormattedMessage id="shared.miles" /></span>}
            formItemClasses="mb-0"
          />
        </Col>
      </Row>
    </Col>
  </>
);

Pickup.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  pickup: PropTypes.bool.isRequired,
  rate: PropTypes.oneOf(TYPE_DELIVERY).isRequired,
  handlerRate: PropTypes.func.isRequired,
  handlerPickup: PropTypes.func.isRequired,
};

export default Pickup;
