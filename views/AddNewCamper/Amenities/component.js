import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
 Col, Divider, Form, Row, Skeleton,
} from 'antd';

import { CAMPER_AMENITIES_CONFIG } from 'constants/camperAmenities';

import ProgressBar from 'views/shared/ProgressBar';
import AddNewCamperBtnForm from 'views/shared/AddNewCamperBtnForm';

import CustomAccommodationSection from './CustomAccommodationSection';
import AmenitySection from './AmenitySection';
import EstimatedEarningCard from '../EstimatedEarningCard';

const Amenities = ({
  isValid,
  validateState,
  isLoading,
  handleValidateOnSubmit,
  onBackButtonClick,
  removeCustomAccommodation,
  addCustomAccommodation,
  handleSwitchChange,
  values: { amenities },
  onMaxAccommodationQuantityCallback,
  onMaxCustomAccommodationQuantityCallback,
  camperCompleteness,
  isCamperExist,
}) => {
  if (!isCamperExist || !amenities) {
    return (
      <div className="main-listing-container">
        <div className="mb-16 mb-md-24">
          <ProgressBar
            content={<FormattedMessage id="addNewCamper.ProgressBar" />}
            percent={camperCompleteness}
          />
        </div>
        <Row>
          <Col lg={24}>
            <h1 className="text-headline mb-8">
              <FormattedMessage id="addNewCamper.amenities.title" />
            </h1>
            <p className="mb-24">
              <FormattedMessage id="addNewCamper.amenities.subTitle" />
            </p>
          </Col>
        </Row>
        <Row gutter={24}>
          <Skeleton active />
        </Row>
      </div>
    );
  }

  return (
    <>
      <div className="main-listing-container">
        <div className="mb-16 mb-md-24">
          <ProgressBar
            content={<FormattedMessage id="addNewCamper.ProgressBar" />}
            percent={camperCompleteness}
          />
        </div>
        <Form>
          <Row>
            <Col span={24}>
              <h1 className="text-headline mb-8">
                <FormattedMessage id="addNewCamper.amenities.title" />
              </h1>
              <p className="mb-24">
                <FormattedMessage id="addNewCamper.amenities.subTitle" />
              </p>
              {amenities
                && amenities.map((amenity, index, array) => (
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
            </Col>
          </Row>
        </Form>
        <EstimatedEarningCard isSlim />
      </div>
      <AddNewCamperBtnForm
        showGradientButton={
          isValid
          && validateState.accommodationsValid
          && validateState.amenitiesValid
        }
        isSubmitting={isLoading}
        canSave={isValid && !isLoading}
        onBackClick={onBackButtonClick}
        onSaveClick={handleValidateOnSubmit}
        withBackBtn
      />
    </>
  );
};

Amenities.defaultProps = {
  isLoading: false,
};

Amenities.propTypes = {
  values: PropTypes.shape().isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  removeCustomAccommodation: PropTypes.func.isRequired,
  addCustomAccommodation: PropTypes.func.isRequired,
  handleValidateOnSubmit: PropTypes.func.isRequired,
  handleSwitchChange: PropTypes.func.isRequired,
  onMaxAccommodationQuantityCallback: PropTypes.func.isRequired,
  onMaxCustomAccommodationQuantityCallback: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  validateState: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool,
  camperCompleteness: PropTypes.number.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
};

export default Amenities;
