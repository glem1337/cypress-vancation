import PropTypes from 'prop-types';

import HeaderUser from 'views/shared/UserHeader';
import UserFooter from 'views/shared/UserFooter';
import HeroPage from 'views/Index/HeroPage';
import Works from 'views/Index/Works';
import BrowsePopular from 'views/Index/BrowsePopular';
import ListYourCampervan from 'views/Index/ListYourCampervan';
import VanLife from 'views/Index/VanLife';
import DiscountCodes from 'views/Index/DiscountCodes';
import FavoriteDestinations from 'views/Index/FavoriteDestinations';
import IdeasNextTrip from 'views/Index/IdeasNextTrip';
import InstagramSection from 'views/Index/InstagramSection';
import useSearchDestinationsHeader from 'utils/hooks/useSearchDestinationsHeader';

import SearchSection from '../SearchSection';

import useContainer from './hook';

const IndexPageComponent = ({ active }) => {
  const {
    headerRef,
    isStartInputVisible,
    isChooseDestinationSmallVisible,
    isChooseDestinationBigVisible,
    onStartInputFocus,
  } = useSearchDestinationsHeader();

  useContainer();

  return (
    <>
      <HeaderUser
        active={active}
        SearchSection={(
          <SearchSection
            isStartInputVisible={isStartInputVisible}
            isChooseDestinationVisible={isChooseDestinationSmallVisible}
            onStartInputFocus={onStartInputFocus}
          />
        )}
        ref={headerRef}
      />
      <div className="home-wrap" id="home-wrap" data-testid="chatroom">
        <HeroPage isChooseDestinationVisible={isChooseDestinationBigVisible} />
        <Works />
        <FavoriteDestinations />
        <BrowsePopular />
        <ListYourCampervan />
        <InstagramSection />
        <VanLife />
        <IdeasNextTrip />
        <DiscountCodes />
      </div>
      <UserFooter />
    </>
  );
};

IndexPageComponent.propTypes = {
  active: PropTypes.string,
};

IndexPageComponent.defaultProps = {
  active: undefined,
};

export default IndexPageComponent;
