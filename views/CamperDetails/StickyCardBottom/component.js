import { FormattedMessage } from 'react-intl';

import BtnGradient from 'views/shared/BtnGradient';
import useCamperPricesAndFees from 'utils/hooks/useCamperPricesAndFees';

import PricesCard from '../CamperPrices/CardMobile';

import useContainer from './hook';

const StickyCardBottom = () => {
  const {
    isCardVisible,
    setPriceCardVisibility,
  } = useContainer();

  const {
    isCamperExist,
    costPerNight,
  } = useCamperPricesAndFees();

  return (
    <>
      <div className="van-details__sticky-card-sticky">
        {isCamperExist ? (
          <>
            <div className="d-flex align-items-center">
              <i className="icon icon-flash-f mr-8 in-yellow-1000" />
              <p className="text-title">
                {`$${costPerNight}`}
                <span className="font-12 text-lowercase font-400">
                  /
                  {' '}
                  <FormattedMessage id="shared.night" />
                </span>
              </p>
            </div>
            <BtnGradient
              size="large"
              className="min-w-140"
              text={{ id: 'shared.instantBook' }}
              onClick={setPriceCardVisibility(true)}
            />
          </>
        ) : (
          <div className="skeleton__title w-100" />
        )}
      </div>
      <PricesCard
        isVisible={isCardVisible}
        closeCard={setPriceCardVisibility(false)}
      />
    </>
  );
};

export default StickyCardBottom;
