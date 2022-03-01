import { Row, Col, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';

import isPresent from 'utils/isPresent';

import SmallSwitchCard from 'views/shared/SmallSwitchCard';
import SwitchField from 'views/shared/SwitchField';

const HealthAndSafetySection = ({ items }) => {
  if (!isPresent(items)) {
    return <Skeleton active />;
  }

  return (
    <>
      <div className="mb-8 text-headline">
        <FormattedMessage id="dashboard.editCamper.amenities.healthAndSafety.title" />
      </div>
      <p className="mb-24 text-color-gray">
        <FormattedMessage id="dashboard.editCamper.amenities.healthAndSafety.description" />
      </p>
      <div className="mb-40">
        <Row>
          {items.map((item, index) => (
            <Col key={item.id} lg={16}>
              <Field
                name={`amenityHealthSafetyItems[${index}].active`}
                component={SwitchField}
                asComponent={SmallSwitchCard}
                componentProps={{
                  icon: item.icon,
                  title: item.title,
                }}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

HealthAndSafetySection.defaultProps = {
  items: null,
};

HealthAndSafetySection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()),
};

export default HealthAndSafetySection;
