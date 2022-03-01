import React from 'react';
import { Image } from 'antd';
import classnames from 'classnames';

import ShareSection from '../ShareSection';

import useContainer from './hook';

const Photos = () => {
  const {
    photos,
    countNotDisplayedPhotos,
    photosString,
    onImageClick,
    containerRef,
    isCamperFetching,
  } = useContainer();

  return (
    <div
      id="details-photos"
      className={classnames(
        'van-details__images',
        { 'van-details__images--skeleton': isCamperFetching !== false },
      )}
      ref={containerRef}
    >
      {isCamperFetching !== false && (
        <>
          <div className="van-details__big-img img-scale-hover" />
          <div className="van-details__small-imgs">
            <div className="van-details__small-img img-scale-hover" />
            <div className="van-details__small-img img-scale-hover" />
            <div className="van-details__small-img img-scale-hover" />
            <div className="van-details__small-img img-scale-hover" />
          </div>
        </>
      )}
      {isCamperFetching === false && (
        <Image.PreviewGroup>
          <div className="van-details__big-img img-scale-hover">
            <Image
              preview={false}
              src={photos.main.photoUrl1100}
              alt=""
              onClick={onImageClick(0, photos.main.photoUrl1100)}
            />
          </div>
          {photos.other.length > 0 && (
            <div className="van-details__small-imgs">
              {photos.other.map((item, index) => (
                <div
                  className="van-details__big-img img-scale-hover"
                  key={item.id}
                >
                  <Image
                    preview={false}
                    src={item.photoUrl1100}
                    alt=""
                    onClick={onImageClick(index + 1, item.photoUrl1100)}
                  />
                </div>
              ))}
            </div>
          )}
        </Image.PreviewGroup>
      )}
      {countNotDisplayedPhotos > 0 && (
        <div
          className="van-details__images-more"
          onClick={onImageClick(0)}
          role="button"
        >
          <p>{`+${countNotDisplayedPhotos}`}</p>
          <p>{photosString}</p>
        </div>
      )}
      {isCamperFetching === false && (
        <ShareSection />
      )}
    </div>
  );
};

export default Photos;
