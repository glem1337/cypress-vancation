import { useRef } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';
import { Button } from 'antd';

import CustomMatcher from 'views/stubs/shared/CustomMatcher';

SwiperCore.use([Pagination]);

const cardInfo = [
  {
    img: 'https://img-de.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fstatic-ind-elliman-california-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fhic%2Fcalifornia-copy-new.jpg&option=N&w=1200&fallbackimageurl=https%3A%2F%2Fstatic-ind-elliman-california-production.gtsstatic.net%2Fresources%2Fsiteresources%2Fcommonresources%2Fimages%2Fnophoto%2Fde_website_holder_400x300.jpg',
    title: 'South Lake Tahoe',
    text: 'California',
  },
  {
    img: 'https://www.orangesmile.com/common/img_cities_original/oregon-20100280-2.jpg',
    title: 'Portland',
    text: 'Oregon',
  },
  {
    img: 'http://blog.newhomesource.com/wp-content/uploads/2020/04/utah.jpg',
    title: 'Moab',
    text: 'Utah',
  },
  {
    img: 'https://cdn.getyourguide.com/img/location/5c5afb6fba694.jpeg/92.jpg',
    title: 'San Diego',
    text: 'California',
  },
];

const SliderFavoriteDestinationMob = () => (
  <div className="main-slider-wrap main-slider-wrap--one">
    <Swiper
      className="home-slider-pos"
      pagination={{
        type: 'fraction',
      }}
      slidesPerView="auto"
      watchOverflow
      freeMode
      freeModeSticky
      loop
    >
      {new Array(3).fill('').map((_slide, i) => (
        <SwiperSlide>
          <a href="#" className="home__favorite-dest-slider-item d-md-none">
            <div className="home__favorite-dest-slider-img">
              <img src={cardInfo[i].img} alt="" />
            </div>
            <p className="text-subtitle mb-4">{cardInfo[i].title}</p>
            <p className="text-caption text-color-gray">{cardInfo[i].text}</p>
          </a>
          <div className="home__favorite-dest-slider-wrap">
            {cardInfo.map((item) => (
              <a href="#" className="home__favorite-dest-slider-item">
                <div className="home__favorite-dest-slider-img">
                  <img src={item.img} alt="" />
                </div>
                <p className="text-subtitle mb-4">{item.title}</p>
                <p className="text-caption text-color-gray">{item.text}</p>
              </a>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

const SliderFavoriteDestinationDesk = () => {
  const swiperRef = useRef(null);

  return (
    <div className="main-slider-wrap main-slider-wrap--one">
      <Swiper
        className="home-slider-pos"
        ref={swiperRef}
        pagination={{
          type: 'fraction',
        }}
        watchOverflow
        loop
        spaceBetween={24}
      >
        {new Array(3).fill('').map(() => (
          <SwiperSlide>
            <div className="home__favorite-dest-slider-wrap">
              {cardInfo.map((item, i) => (
                <a
                  href="#"
                  className={classNames(
                    'home__favorite-dest-slider-item',
                    i % 2 === 0 && 'home__favorite-dest-slider-item--skeleton',
                  )}
                >
                  <div className="home__favorite-dest-slider-img">
                    <img src={item.img} alt="" />
                  </div>
                  <p className="text-subtitle mb-4">{item.title}</p>
                  <p className="text-caption text-color-gray">{item.text}</p>
                </a>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="search-page__slider-nav">
        <Button
          icon={<i className="icon icon-left font-14" />}
          type="secondary"
          shape="circle"
          onClick={() => swiperRef.current.swiper.slidePrev()}
        />
        <Button
          className="ml-16"
          icon={<i className="icon icon-right font-14" />}
          type="secondary"
          shape="circle"
          onClick={() => swiperRef.current.swiper.slideNext()}
        />
      </div>
    </div>
  );
};

const SliderFavoriteDestination = (props) => (
  <CustomMatcher.Provider>
    <CustomMatcher.Matcher
      mobile={<SliderFavoriteDestinationMob {...props} />}
      desktop={<SliderFavoriteDestinationDesk {...props} />}
    />
  </CustomMatcher.Provider>
);

export default SliderFavoriteDestination;
