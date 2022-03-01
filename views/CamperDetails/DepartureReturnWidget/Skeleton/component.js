import React from 'react';
import { Divider } from 'antd';

import SkeletonText from 'views/shared/SkeletonText';
import SkeletonTitle from 'views/shared/SkeletonTitle';

const Skeleton = () => (
  <div className="van-details__sticky-card van-details__sticky-card--skeleton">
    <div className="van-details__sticky-card-header">
      <div className="flex-1 mr-32">
        <SkeletonTitle />
        <SkeletonText className="mb-0" rows={1} />
      </div>
      <div className="van-details__sticky-card-header-img" />
    </div>
    <div className="van-details__sticky-card-body">
      <SkeletonTitle />
      <SkeletonText rows={3} />
      <Divider className="mt-16 mb-16" />
      <SkeletonTitle className="h-20" />
      <SkeletonTitle className="mb-0" />
    </div>
  </div>
);

export default Skeleton;
