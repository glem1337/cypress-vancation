import React from 'react';
import SwiperCore, { Pagination } from 'swiper/core';
import { injectIntl } from 'react-intl';

import BrowsePopularComponent from './component';

SwiperCore.use([Pagination]);

class BrowsePopular extends React.PureComponent {
  constructor(props) {
    super(props);
    this.swiperRef = React.createRef();
  }

  breakpoints = {
    768: {
      spaceBetween: 32,
    },
    1200: {
      freeMode: false,
    },
  }

  handlerPrev = () => {
    this.swiperRef.current.swiper.slidePrev();
  }

  handlerNext = () => {
    this.swiperRef.current.swiper.slideNext();
  }

  render = () => (
    <BrowsePopularComponent
      {...this.props}
      handlerPrev={this.handlerPrev}
      handlerNext={this.handlerNext}
      swiperRef={this.swiperRef}
      breakpoints={this.breakpoints}
    />
  );
}

export { BrowsePopular as BrowsePopularContainer };
export default injectIntl(BrowsePopular);
