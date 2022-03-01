import PropTypes from 'prop-types';
import { Button, Col, Row } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';

import InputField from 'views/shared/InputField';
import SwitchField from 'views/shared/SwitchField';

const CustomRules = ({
  items,
  onAdd,
  onRemove,
  keyProp,
  title,
  label,
  btnText,
}) => (
  <div className="mb-40">
    <Col lg={16}>
      <Row gutter={24}>
        <Col span={24}>
          <div className="mb-24 text-subheader font-400">
            <FormattedMessage {...title} />
          </div>
        </Col>
        <Col span={24}>
          {items.map((item, index) => (
            <div key={item.id || item.listId} className="custom-add-wrap">
              <div className="flex-grow-1">
                <Field
                  id={`${keyProp}[${index}].name`}
                  name={`${keyProp}[${index}].name`}
                  component={InputField}
                  label={label}
                />
              </div>
              <div className="d-inline-flex align-items-center ml-24">
                <Field
                  id={`${keyProp}[${index}].active`}
                  name={`${keyProp}[${index}].active`}
                  component={SwitchField}
                />
              </div>
              <div className="custom-acc-wrap__close">
                <Button
                  onClick={onRemove({
                    id: item.id,
                    index,
                    keyProp,
                  })}
                  type="secondary"
                  icon={<i className="icon icon-cross" />}
                />
              </div>
            </div>
          ))}
        </Col>
        <Col span={24}>
          <Button onClick={onAdd(keyProp)} type="secondary">
            <FormattedMessage {...btnText} />
          </Button>
        </Col>
      </Row>
    </Col>
  </div>
);

CustomRules.propTypes = {
  keyProp: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  title: PropTypes.shape().isRequired,
  label: PropTypes.shape().isRequired,
  btnText: PropTypes.shape().isRequired,
};

export default CustomRules;
