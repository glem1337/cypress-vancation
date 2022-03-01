/* eslint-disable react/prop-types */
import { Checkbox } from 'antd';

import MapPin from './MapPin';

const Map = ({ isEmpty }) => (
  <div className="search-page__map">
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
    <div className="search-page__map-mob__toggle">
      <Checkbox defaultChecked>Search as I move the map</Checkbox>
    </div>
    {!isEmpty && (
      <>
        <MapPin isGlamper style={{ top: '322px', left: '392px' }} />
        <MapPin isInstant style={{ top: '338px', left: '162px' }} />
        <MapPin style={{ top: '644px', left: '186px' }} />
      </>
    )}
  </div>
);

export default Map;
