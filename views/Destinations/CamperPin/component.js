import { Popover } from 'antd';

import useContainer from './hook';
import Content from './Content';

const CamperPin = (props) => {
  const {
    isActive,
    onVisibleChange,
    camperData,
    getPopupContainer,
    swiperRef,
    slidePrev,
    slideNext,
    showDetails,
    camperPhotos,
    onDoubleClick,
    isLoading,
  } = useContainer(props);

  const content = (
    <Content
      id={camperData.id}
      isGlamper={camperData.isGlamper}
      isNew={camperData.isNew}
      isInstantBook={camperData.isInstantBook}
      swiperRef={swiperRef}
      name={camperData.name}
      vehicleTypeName={camperData.vehicleTypeName}
      makeModel={camperData.makeModel}
      rating={camperData.rating}
      cost={camperData.cost}
      costPeriod={camperData.costPeriod}
      slidePrev={slidePrev}
      slideNext={slideNext}
      showDetails={showDetails}
      camperPhotos={camperPhotos}
      onDoubleClick={onDoubleClick}
      isLoading={isLoading}
    />
  );

  return (
    <Popover
      visible={isActive}
      content={content}
      placement="top"
      trigger="click"
      onVisibleChange={onVisibleChange}
      overlayClassName="ant-popover-map-pin"
      getPopupContainer={getPopupContainer}
    >
      <div className="search-page__map-pin">
        {camperData.isInstantBook && (
          <i className="icon icon-flash-f in-yellow-1000 font-18 mr-2" />
        )}
        {camperData.cost}
      </div>
    </Popover>
  );
};

export default CamperPin;
