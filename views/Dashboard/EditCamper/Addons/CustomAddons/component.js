import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, Row, Button } from 'antd';
import { Field } from 'formik';

import { PRICE_UNIT_OPTIONS } from 'constants/dashboardAddons';

import SwitchField from 'views/shared/SwitchField';
import InputField from 'views/shared/InputField/container';
import SelectField from 'views/AddNewCamper/CamperDetails/SelectField';

const CustomAddons = ({ items, onAdd, onRemove }) => (
  <div className="mb-40">
    <Col lg={16}>
      <Row gutter={24}>
        <Col span={24}>
          <div className="mb-24 text-subheader font-400">
            <FormattedMessage id="dashboard.editCamper.addons.custom.title" />
          </div>
        </Col>
        <Col span={24}>
          {items.map((item, index) => (
            <div
              key={item.id || item.listId}
              className="custom-add-wrap custom-add-wrap--addons"
            >
              <div className="flex-grow-1">
                <Field
                  name={`customAddons[${index}].name`}
                  label={{ id: 'dashboard.editCamper.addons.custom.nameLabel' }}
                  component={InputField}
                />
                <Field
                  name={`customAddons[${index}].description`}
                  label={{ id: 'shared.description' }}
                  component={InputField}
                />
                <div className="edit-list-switch-card__input-fields">
                  <Field
                    type="number"
                    prefix="$"
                    formItemClasses="edit-list-switch-card__small-input mb-0"
                    name={`customAddons[${index}].price`}
                    label={{ id: 'shared.price' }}
                    component={InputField}
                  />
                  <Field
                    formItemClasses="mb-0"
                    className="main-input__field main-input__field--no-label"
                    name={`customAddons[${index}].priceUnit`}
                    component={SelectField}
                    items={PRICE_UNIT_OPTIONS}
                  />
                  <Field
                    type="number"
                    formItemClasses="mb-0"
                    name={`customAddons[${index}].maxAmount`}
                    label={{ id: 'shared.maxQuantity' }}
                    component={InputField}
                  />
                </div>
              </div>
              <div className="ml-16 ml-md-24">
                <Field
                  name={`customAddons[${index}].active`}
                  component={SwitchField}
                />
              </div>
              <div className="custom-acc-wrap__close">
                <Button
                  onClick={onRemove({ index, addonId: item.id })}
                  type="secondary"
                  icon={<i className="icon icon-cross" />}
                />
              </div>
            </div>
          ))}
        </Col>
        <Col span={24}>
          <Button onClick={onAdd} type="secondary">
            <FormattedMessage id="dashboard.editCamper.addons.custom.btn" />
          </Button>
        </Col>
      </Row>
    </Col>
  </div>
);

CustomAddons.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CustomAddons;
