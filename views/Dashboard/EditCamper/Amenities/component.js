import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
 Col, Divider, Form, Row, Skeleton,
} from 'antd';

import { CAMPER_AMENITIES_CONFIG } from 'constants/camperAmenities';

import EditCamperLayout from 'views/layouts/EditCamper';

import CustomAccommodationSection from 'views/AddNewCamper/Amenities/CustomAccommodationSection';
import AmenitySection from 'views/AddNewCamper/Amenities/AmenitySection';

import HealthAndSafetySection from 'views/Dashboard/EditCamper/Amenities/HealthAndSafetySection';

const Amenities = ({
  isValid,
  isLoading,
  handleValidateOnSubmit,
  removeCustomAccommodation,
  addCustomAccommodation,
  handleSwitchChange,
  values: { amenities, amenityHealthSafetyItems },
  onMaxAccommodationQuantityCallback,
  onMaxCustomAccommodationQuantityCallback,
  isCamperExist,
  leavePagePrepare,
}) => (
  <EditCamperLayout
    hasFooter
    canSave={isValid && !isLoading}
    onSave={handleValidateOnSubmit}
    isLoading={isLoading}
    leavePageMethod={leavePagePrepare}
  >
    <div className="container">
      <Form>
        <Row gutter={24}>
          <Col span={24}>
            <h1 className="text-headline mb-8">
              <FormattedMessage id="addNewCamper.amenities.title" />
            </h1>
            {isCamperExist && amenities ? (
              <>
                {amenities.map((amenity, index, array) => (
                  <React.Fragment key={amenity.id}>
                    <AmenitySection
                      index={index}
                      title={amenity.title}
                      icon={amenity.iconUrl}
                      handleSwitchChange={handleSwitchChange}
                      onMaxAccommodationQuantityCallback={
                        onMaxAccommodationQuantityCallback
                      }
                      items={amenity.configurationSubAmenities}
                      options={amenity.configurationAmenityOptions}
                      withDivider={index < array.length - 1}
                    />
                    {amenity.title
                      === CAMPER_AMENITIES_CONFIG.ACCOMMODATION_TITLE && (
                      <>
                        <CustomAccommodationSection
                          amenityIndex={index}
                          items={amenity.configurationCustomAmenities}
                          addCustomAccommodation={addCustomAccommodation}
                          removeCustomAccommodation={removeCustomAccommodation}
                          onMaxCustomAccommodationQuantityCallback={
                            onMaxCustomAccommodationQuantityCallback
                          }
                        />
                        <Divider className="mt-24" />
                      </>
                    )}
                  </React.Fragment>
                ))}
                <Divider />
                <HealthAndSafetySection items={amenityHealthSafetyItems} />
              </>
            ) : (
              <Skeleton active />
            )}
          </Col>
        </Row>
      </Form>
    </div>
  </EditCamperLayout>
);

Amenities.propTypes = {
  values: PropTypes.shape().isRequired,
  removeCustomAccommodation: PropTypes.func.isRequired,
  addCustomAccommodation: PropTypes.func.isRequired,
  handleValidateOnSubmit: PropTypes.func.isRequired,
  handleSwitchChange: PropTypes.func.isRequired,
  onMaxAccommodationQuantityCallback: PropTypes.func.isRequired,
  onMaxCustomAccommodationQuantityCallback: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  leavePagePrepare: PropTypes.func.isRequired,
};

export default Amenities;
