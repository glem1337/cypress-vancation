import { useRef } from 'react';
import { Button, Image } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';

import CustomMatcher from 'views/stubs/shared/CustomMatcher';
import Modal from '../../../shared/Modal';

SwiperCore.use([Pagination]);

const Slider = () => {
  const swiperRef = useRef(null);

  return (
    <>
      <Swiper
        ref={swiperRef}
        pagination={{
          type: 'fraction',
        }}
        loop
      >
        <SwiperSlide>
          <Image
            preview={false}
            src="https://source.unsplash.com/random/1600x900"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            preview={false}
            src="https://source.unsplash.com/random"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            preview={false}
            src="https://source.unsplash.com/user/erondu"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
      <Button
        className="swiper-nav-prev"
        size="large"
        icon={<i className="icon icon-left font-14" />}
        type="secondary"
        shape="circle"
        onClick={() => swiperRef.current.swiper.slidePrev()}
      />
      <Button
        className="swiper-nav-next"
        size="large"
        icon={<i className="icon icon-right font-14" />}
        type="secondary"
        shape="circle"
        onClick={() => swiperRef.current.swiper.slideNext()}
      />
    </>
  );
};

const ImgList = () => (
  <>
    <Image
      preview={false}
      src="https://source.unsplash.com/random/1600x900"
      alt=""
    />
    <Image preview={false} src="https://source.unsplash.com/random" alt="" />
    <Image
      preview={false}
      src="https://source.unsplash.com/user/erondu"
      alt=""
    />
    <Image preview={false} src="https://source.unsplash.com/random" alt="" />
  </>
);

const GalleryModal = () => (
  <Modal className="main-modal main-modal--van-gallery" closable={false}>
    <div className="main-modal__container">
      <div className="main-modal__header">
        <Button
          icon={<i className="icon icon-cross" />}
          type="secondary"
          shape="circle"
          size="large"
        />
      </div>
      <div className="main-modal__body">
        <div className="van-details__modal-gallery">
          <CustomMatcher.Provider>
            <CustomMatcher.Matcher mobile={<ImgList />} desktop={<Slider />} />
          </CustomMatcher.Provider>
        </div>
      </div>
    </div>
  </Modal>
);

export default GalleryModal;
