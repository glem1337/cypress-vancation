/* eslint-disable react/prop-types */
import classNames from 'classnames';
import { Button, Checkbox } from 'antd';

import SliderMap from './SliderMap';
import MapPin from './MapPin';

const MapMob = ({ active, mapMobToggle, filtersMobToggle, isEmpty }) => (
  <div
    className={classNames(
      'search-page__map-mob',
      active && 'search-page__map-mob--show',
    )}
  >
    {/* remove following image after map implementation */}
    <img
      style={{
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
      src="https://staticmapmaker.com/img/google@2x.png"
      alt="Google Map of Albany, NY"
    />
    <Button
      className="search-page__map-mob__update"
      icon={<i className="icon icon-update in-gray-500 font-16" />}
      type="text"
      size="small"
    >
      Search this area
    </Button>
    <Button
      className="search-page__map-mob__close"
      icon={<i className="icon icon-cross in-gray-500" />}
      type="text"
      size="large"
      onClick={mapMobToggle}
    />
    <div className="search-page__map-mob__toggle">
      <Checkbox defaultChecked>Search as I move the map</Checkbox>
    </div>
    <Button
      className="search-page__map-mob__filters"
      icon={<i className="icon icon-filter in-gray-500" />}
      type="text"
      size="large"
      onClick={filtersMobToggle}
    />
    {!isEmpty && (
      <>
        <SliderMap />
        <MapPin isGlamper style={{ top: '20%', left: '80%' }} />
        <MapPin isInstant style={{ top: '40%', left: '50%' }} />
        <MapPin style={{ top: '60%', left: '30%' }} />
      </>
    )}
  </div>
);

export default MapMob;
