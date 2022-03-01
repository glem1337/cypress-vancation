import PropTypes from 'prop-types';
import { Col } from 'antd';
import { Field } from 'formik';

import { PRICE_UNIT_OPTIONS } from 'constants/dashboardAddons';

import SwitchField from 'views/shared/SwitchField';
import SmallSwitchCard from 'views/shared/SmallSwitchCard';
import InputField from 'views/shared/InputField/container';
import SelectField from 'views/AddNewCamper/CamperDetails/SelectField';

const SuggestedAddons = ({ items }) => items.map((addon, index) => (
  <Col key={addon.id} span={24}>
    <Col lg={16}>
      <Field
        name={`addons[${index}].active`}
        component={SwitchField}
        asComponent={SmallSwitchCard}
        componentProps={{
            icon: addon.iconUrl,
            title: addon.name,
            showChildren: items[index].active,
        }}
      >
        {items[index].active && (
          <>
            <Field
              formItemClasses="w-100"
              name={`addons[${index}].description`}
              label={{ id: 'shared.description' }}
              component={InputField}
            />
            <div className="edit-list-switch-card__input-fields">
              <Field
                type="number"
                prefix="$"
                formItemClasses="edit-list-switch-card__small-input mb-0"
                name={`addons[${index}].price`}
                label={{ id: 'shared.price' }}
                component={InputField}
              />
              <Field
                formItemClasses="mb-0"
                className="main-input__field main-input__field--no-label"
                name={`addons[${index}].priceUnit`}
                component={SelectField}
                items={PRICE_UNIT_OPTIONS}
              />
              <Field
                type="number"
                formItemClasses="mb-0"
                name={`addons[${index}].maxAmount`}
                label={{ id: 'shared.maxQuantity' }}
                component={InputField}
              />
            </div>
          </>
        )}
      </Field>
    </Col>
  </Col>
  ));

SuggestedAddons.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default SuggestedAddons;
