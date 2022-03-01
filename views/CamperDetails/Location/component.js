import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Layer, Source, Marker, StaticMap } from 'react-map-gl';
import * as R from 'ramda';
import { Col, Row } from 'antd';

import { MAIN_STYLE_MAPBOX, ACCESS_TOKEN_MAPBOX } from 'constants/mapbox';
import isPresent from 'utils/isPresent';

import useContainer from './hook';

const Location = () => {
  const {
    latitude,
    longitude,
    place,
    vehicleTypeIconUrl,
    circle,
    mapRef,
    vehicleTypeName,
    containerRef,
  } = useContainer();

  if (!latitude || !longitude) {
    return null;
  }

  return (
    <div
      id="details-location"
      className="d-flex flex-column"
      ref={containerRef}
    >
      <div className="container w-100">
        <Row>
          <Col span={24}>
            <div className="d-md-flex justify-content-space-between mb-24">
              <p className="text-headline mb-16 mb-md-0 font-700">
                <FormattedMessage id="shared.location" />
              </p>
              <div className="d-flex align-items-center">
                <img
                  className="mr-12"
                  src="/images/listing/Modern-Van.svg"
                  alt=""
                />
                <p className="font-600">
                  {vehicleTypeName}
                  {' in '}
                  <span className="in-blue-1000">
                    {place}
                  </span>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <StaticMap
        width="100%"
        height="400px"
        zoom={5}
        latitude={latitude}
        longitude={longitude}
        mapboxApiAccessToken={ACCESS_TOKEN_MAPBOX}
        mapStyle={MAIN_STYLE_MAPBOX}
        ref={mapRef}
      >
        <Marker
          latitude={latitude}
          longitude={longitude}
          offsetLeft={-32}
          offsetTop={-32}
        >
          <div className="main-listing-delivery__mapbox__marker">
            <img
              width={30}
              src={vehicleTypeIconUrl}
              alt="camper-type"
            />
          </div>
        </Marker>
        {isPresent(circle) && (
          <Source id="delivery-camper" type="geojson" data={circle}>
            <Layer
              id="delivery-camper-layer"
              type="fill"
              paint={{ 'fill-color': 'rgba(0,165,181,0.38)' }}
            />
          </Source>
        )}
      </StaticMap>
    </div>
  );
};

export default memo(Location, R.T);
