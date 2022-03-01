import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Tag } from 'antd';
import * as R from 'ramda';
import classnames from 'classnames';

import isPresent from 'utils/isPresent';
import SkeletonTitle from 'views/shared/SkeletonTitle';

import useContainer from './hook';

const MainInfo = () => {
  const {
    camper,
    milesCount,
    deliveryDistance,
    ratingColors,
    isOffGridCapableExist,
  } = useContainer();

  if (!isPresent(camper)) {
    return (
      <div className="van-details__name-wrap van-details__name-wrap--skeleton">
        <SkeletonTitle />
        <SkeletonTitle />
        <SkeletonTitle width={60} />
        <SkeletonTitle className="mb-0" width={35} />
      </div>
    );
  }

  return (
    <div className="van-details__name-wrap">
      <h1 className="main-title mb-16">
        {camper?.name}
      </h1>
      <div className="van-details__tags-wrap">
        {camper?.glamper && (
          <div className="tag-glamper mr-8">
            <img
              className="mr-4"
              src="/images/profile/Diamond-White.svg"
              alt=""
            />
            <FormattedMessage id="shared.glamper" />
          </div>
        )}
        {deliveryDistance > 0 && (
          <Tag
            className="mr-8"
            color="default"
            icon={<i className="icon icon-delivery in-black" />}
          >
            <span className="in-black">
              <FormattedMessage
                id="camperDetails.mainInfo.tag.delivery"
                values={{ miles: deliveryDistance }}
              />
            </span>
          </Tag>
        )}
        {isOffGridCapableExist && (
          <Tag
            className="mr-8"
            color="default"
            icon={(
              <img
                className="mr-4"
                src="/images/details_camp/Off-Grid Capable.svg"
                alt=""
              />
          )}
          >
            <span className="in-black">
              <FormattedMessage id="camperDetails.mainInfo.tag.offGridCapable" />
            </span>
          </Tag>
        )}
        <Tag
          className="mr-8"
          color="default"
          icon={(
            <img
              className="van-details__miles-tag"
              src="/images/edit_listing/rules/Allow-Unlimited-Miles.svg"
              alt=""
            />
          )}
        >
          {isPresent(milesCount)
            ? (
              <span className="in-black">
                <FormattedMessage
                  id="camperDetails.mainInfo.tag.limitedMilesCount"
                  values={{ miles: milesCount }}
                />
              </span>
            )
            : (
              <span className="in-black">
                <FormattedMessage id="camperDetails.mainInfo.tag.unlimitedMilesFree" />
              </span>
            )}
        </Tag>
      </div>
      <div className="d-flex align-items-center">
        <div
          className={
            classnames(
              'profile-user-card__photo-rating-icon',
              ratingColors.background,
            )
          }
        >
          <img src="/images/Like - White.svg" alt="" />
        </div>
        <p
          className={
            classnames(
              'mr-16 in-green-300 text-title',
              ratingColors.text,
            )
          }
        >
          {`${camper?.raiting}%`}
        </p>
      </div>
    </div>
  );
};

export default memo(MainInfo, R.T);
