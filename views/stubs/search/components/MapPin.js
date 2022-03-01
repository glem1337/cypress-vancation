/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Popover } from 'antd';

import CardPin from './CardPin';

const MapPin = ({ isInstant, isGlamper, style }) => {
  const [isActive, setIsActive] = useState(false);
  const content = <CardPin isGlamper={isGlamper} />;

  return (
    <Popover
      visible={isActive}
      content={content}
      placement="top"
      trigger="click"
      onVisibleChange={setIsActive}
      overlayClassName="ant-popover-map-pin"
      getPopupContainer={() => document.querySelector('.search-page__wrap')}
    >
      <div className="search-page__map-pin" style={style}>
        {isInstant && (
          <i className="icon icon-flash-f in-yellow-1000 font-18 mr-2" />
        )}
        $130
      </div>
    </Popover>
  );
};

export default MapPin;
