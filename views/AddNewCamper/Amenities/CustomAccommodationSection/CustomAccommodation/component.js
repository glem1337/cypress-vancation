import { Field } from 'formik';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { CAMPER_AMENITIES_CONFIG } from 'constants/camperAmenities';

import InputField from 'views/shared/InputField';
import InputNumericField from 'views/shared/InputNumericField';

const CustomAccommodation = ({
  amenityIndex,
  index,
  onRemove,
  onMaxCustomAccommodationQuantityCallback,
}) => (
  <>
    <div className="custom-acc-wrap">
      <label
        htmlFor={`amenities[${amenityIndex}]configurationCustomAmenities[${index}]name`}
        className="main-input__label w-100"
      >
        <FormattedMessage id="shared.name" />
      </label>
      <div className="flex-grow-1 mb-16 mb-md-0">
        <Field
          name={`amenities[${amenityIndex}]configurationCustomAmenities[${index}]name`}
          id={`amenities[${amenityIndex}]configurationCustomAmenities[${index}]name`}
          className="main-input__field w-100"
          component={InputField}
          formItemClasses="mb-0"
        />
      </div>
      <Field
        wrapperClassname="custom-acc-wrap__sec-input align-self-start"
        className="mb-0"
        name={`amenities[${amenityIndex}]configurationCustomAmenities[${index}]quantity`}
        id={`amenities[${amenityIndex}]configurationCustomAmenities[${index}]quantity`}
        component={InputNumericField}
        min={CAMPER_AMENITIES_CONFIG.MIN_QUANTITY}
        max={CAMPER_AMENITIES_CONFIG.MAX_CUSTOM_ACCOMMODATION_QUANTITY}
        onMaxValueTrigger={onMaxCustomAccommodationQuantityCallback}
      />
      <div className="custom-acc-wrap__close">
        <Button
          onClick={onRemove}
          type="secondary"
          icon={<i className="icon icon-cross" />}
        />
      </div>
    </div>
  </>
);

CustomAccommodation.propTypes = {
  amenityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMaxCustomAccommodationQuantityCallback: PropTypes.func.isRequired,
};

export default CustomAccommodation;
