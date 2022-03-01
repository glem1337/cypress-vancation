import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import Classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';

import InputField from 'views/shared/InputField/container';

const Rate = ({
  hide,
  isLoading,
}) => (
  <Row className="mt-16" gutter={24}>
    <Col
      md={12}
      lg={8}
      className={Classnames({ 'd-none': hide, 'd-block': !hide })}
    >
      <Field
        type="number"
        name="costPerMile"
        component={InputField}
        disabled={isLoading}
        label={{ id: 'addNewCamper.delivery.form.costPerMile' }}
        placeholder={{ id: 'addNewCamper.delivery.form.costPerMile' }}
        prefix={<span className="in-black">$</span>}
        suffix={<span className="in-gray-700"><FormattedMessage id="shared.perMile" /></span>}
      />
    </Col>
    <Col
      md={12}
      lg={8}
      className={Classnames({ 'd-none': hide, 'd-block': !hide })}
    >
      <Field
        type="number"
        name="minFee"
        component={InputField}
        disabled={isLoading}
        label={{ id: 'addNewCamper.delivery.form.minimumDeliveryFee' }}
        placeholder={{ id: 'addNewCamper.delivery.form.minimumDeliveryFee' }}
        prefix={<span className="in-black">$</span>}
      />
    </Col>
  </Row>
);

Rate.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hide: PropTypes.bool.isRequired,
};

export default Rate;
