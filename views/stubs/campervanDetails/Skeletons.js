import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import classNames from 'classnames';

import SkeletonTitle from 'views/stubs/shared/skeleton/SkeletonTitle';
import SkeletonText from 'views/stubs/shared/skeleton/SkeletonText';
import Header from '../layout/headers/mainHeader/Header';
import NavHeaderSkeleton from './components/NavHeaderSkeleton';
import GallerySkeleton from './components/GallerySkeleton';
import StickyInfoCardSkeleton from './components/StickyInfoCardSkeleton';

const CampervanDetailsSkeletons = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cardHidden, setCardHidden] = useState(false);

  useEffect(() => {
    const handler = () => {
      const { scrollY } = window;
      // these are dummy values, the actual ones must be calculated
      setScrolled(scrollY >= 420);
      setCardHidden(scrollY >= 3725);
    };
    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div
      className={classNames(
        'van-details-wrap',
        scrolled && 'van-details-wrap--scrolled',
      )}
    >
      <Header />
      <NavHeaderSkeleton cardHidden={cardHidden} />
      <div>
        <GallerySkeleton />
        <div className="container">
          <Row>
            <Col xl={16}>
              <div className="van-details__name-wrap van-details__name-wrap--skeleton">
                <SkeletonTitle />
                <SkeletonTitle />
                <SkeletonTitle width={60} />
                <SkeletonTitle className="mb-0" width={35} />
              </div>
              <div id="details-overview" className="van-details__info">
                <SkeletonTitle className="mb-0" />
              </div>
              <SkeletonText className="mb-24" rows={4} />
              <Row className="mt-40 mb-16" gutter={24}>
                {new Array(10).fill(null).map(() => (
                  <Col md={8} xl={6}>
                    <SkeletonTitle className="mb-24" />
                  </Col>
                  ))}
              </Row>
              <SkeletonTitle />
              <SkeletonText className="mb-24" rows={4} />
            </Col>
            <Col xl={8}>
              <StickyInfoCardSkeleton />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CampervanDetailsSkeletons;
