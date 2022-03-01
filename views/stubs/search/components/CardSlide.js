/* eslint-disable react/prop-types */
import { useState } from 'react';
import classNames from 'classnames';
import { Tag } from 'antd';

const CardSlide = ({ isGlamper }) => {
  const [inFavourite, setInFavourite] = useState(false);

  return (
    <div className="camper-card-preview camper-card-preview--small">
      <div className="camper-card-preview__image-wrap">
        <div className="camper-card-preview__img">
          <img
            src="https://bit.ly/3hO1hK9"
            alt=""
          />
        </div>
        <div className="camper-card-preview__card-tags">
          <div>
            <Tag icon={<i className="icon icon-star-f in-red-1000" />} />
            <Tag icon={<i className="icon icon-flash-f in-yellow-1000" />} />
          </div>
        </div>
        {isGlamper && (
          <div className="camper-card-preview__card-tag-glamper tag-glamper">
            <img src="/images/profile/Diamond-White.svg" alt="" />
          </div>
        )}
        <Tag
          className="camper-card-preview__card-tag-delivery"
          icon={<i className="icon icon-delivery-f in-black" />}
        />
      </div>
      <a href="#" className="camper-card-preview__bottom">
        <button
          type="button"
          className="camper-card-preview__favorite"
          onClick={(e) => {
            e.preventDefault();
            setInFavourite(prev => !prev);
          }}
        >
          <i
            className={classNames(
              'icon',
              inFavourite
                ? 'icon-heart-f in-red-1000'
                : 'icon-heart in-gray-500',
            )}
          />
        </button>
        <div className="camper-card-preview__bottom-title">
          Forest River Grey Wolf 2020
        </div>
        <div>
          <p className="text-caption text-uppercase">Unique camper</p>
          <p className="text-caption text-uppercase">Ford Econoline 150</p>
        </div>
        <div className="d-flex justify-content-space-between mt-auto">
          <div className="d-flex align-items-center">
            <img className="w-20" src="/images/listing/Like-Green.svg" alt="" />
            <span className="font-600 in-green-300 mr-2">95%</span>
            <span className="text-caption">(26)</span>
          </div>
          <div className="in-black">
            <span className="text-subheader font-700 mr-4">$130</span>
            <span className="text-caption">/ night</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CardSlide;
