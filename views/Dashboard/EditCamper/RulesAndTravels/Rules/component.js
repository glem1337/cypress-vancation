import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Col, Row } from 'antd';

import SmallSwitchCard from 'views/shared/SmallSwitchCard';
import SwitchField from 'views/shared/SwitchField';

const Rules = ({ config, children }) => (
  <Row>
    {children && <Col span={24}>{children}</Col>}
    {config.map((item) => (
      <Col key={item.name} span={24}>
        <Col lg={16}>
          <Field
            name={item.name}
            component={SwitchField}
            asComponent={SmallSwitchCard}
            componentProps={{
              icon: item.icon,
              title: item.title,
              description: item.description,
              disabled: item.disabled,
            }}
          />
        </Col>
      </Col>
    ))}
  </Row>
);

Rules.defaultProps = {
  children: null,
};

Rules.propTypes = {
  config: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  children: PropTypes.node,
};

export default Rules;
