import { Row, Col } from 'antd';

import SkeletonText from 'views/stubs/shared/skeleton/SkeletonText';
import SkeletonTitle from 'views/stubs/shared/skeleton/SkeletonTitle';

const NavHeaderSkeleton = () => (
  <div className="van-details__nav-header">
    <div className="container">
      <Row gutter={24}>
        <Col xl={16}>
          <div className="overflow-hidden">
            <div className="d-flex align-items-flex-start justify-content-space-between">
              <SkeletonTitle />
            </div>
            <SkeletonText rows={1} />
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default NavHeaderSkeleton;
