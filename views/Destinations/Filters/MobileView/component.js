import classNames from 'classnames';
import {
 Button, Divider, Tooltip,
} from 'antd';
import { FormattedMessage } from 'react-intl';

import GradientButton from 'views/shared/GradientButton';
import { FILTERS } from 'constants/searchDestinations';
import useMobileFilterVisibility from 'utils/hooks/useMobileFilterVisibility';
import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';

import useSharedValues from '../hooks/useSharedValues';
import useQuests from '../hooks/useQuests';
import usePrice from '../hooks/usePrice';
import useVehicles from '../hooks/useVehicles';
import useGlamperOnly from '../hooks/useGlamperOnly';
import useDelivery from '../hooks/useDelivery';
import useMoreFilters from '../hooks/useMoreFilters';

const MobileView = (props) => {
  const propsExtended = {
    ...props,
    immediatelyApply: true,
  };

  const {
    isAnyFilterApplied,
    clearAllFilters,
  } = useDestinationPageStats();

  const {
    isMobileVisible,
    toggleMobileFiltersVisibility,
  } = useMobileFilterVisibility();

  // Shared values.
  const {
    campersTotal,
    areCampersFetching,
  } = useSharedValues();

  // Guests.
  const { renderQuestsWidget } = useQuests(propsExtended);

  // Price.
  const { renderPriceWidget } = usePrice(propsExtended);

  // Vehicles.
  const { renderVehiclesWidget } = useVehicles(propsExtended);

  // Glamper only.
  const { renderGlamperOnlyWidget, isGlamper } = useGlamperOnly();

  // Delivery.
  const { renderDeliveryWidget } = useDelivery(propsExtended);

  // More filters.
  const {
    renderStandardAmenities,
    renderLuxuryAmenities,
    renderInsideHeight,
    renderRules,
    renderRating,
  } = useMoreFilters(propsExtended);

  return (
    <aside
      className={classNames(
        'search-page__filters-mob',
        isMobileVisible && 'search-page__filters-mob--open',
      )}
    >
      <div className="search-page__filters-mob__header">
        <div>
          <span className="text-title">
            <FormattedMessage id="shared.filter" />
          </span>
          {isAnyFilterApplied && (
            <Button
              className="ml-16"
              type="simple-text"
              size="large"
              onClick={clearAllFilters}
            >
              <FormattedMessage id="shared.clearFilters" />
            </Button>
          )}
        </div>
        <Button
          icon={<i className="icon icon-cross" />}
          type="secondary"
          shape="circle"
          size="large"
          onClick={toggleMobileFiltersVisibility}
        />
      </div>
      <div className="search-page__filters-mob__main">
        <div className="search-page__filters-mob__item">
          <h3 className="text-headline mb-24">
            <FormattedMessage id="shared.guests" />
          </h3>
          {renderQuestsWidget()}
        </div>
        <Divider className="mt-24 mb-24" />
        <div className="search-page__filters-mob__item">
          <h3 className="text-headline mb-24">
            <FormattedMessage id="shared.price" />
          </h3>
          {renderPriceWidget()}
        </div>
        <Divider className="mt-24 mb-24" />
        <div className="search-page__filters-mob__item">
          <h3 className="text-headline mb-24">
            <FormattedMessage id="addNewCamper.camperDetails.form.vehicleType" />
          </h3>
          <div className="search-page__filters-popover__grid search-page__filters-popover__grid--vehicle">
            {renderVehiclesWidget()}
          </div>
        </div>
        <div className="search-page__filters-mob__item mt-24 mb-24">
          <div
            className={
              classNames(
                'search-page__filters-toggle',
                { 'search-page__filters-toggle--inactive': !isGlamper },
              )
            }
          >
            <div className="search-page__filters-toggle-inner">
              {renderGlamperOnlyWidget()}
            </div>
          </div>
        </div>
        <Divider className="mt-24 mb-24" />
        <div className="search-page__filters-mob__item">
          <h3 className="text-headline mb-24">
            <FormattedMessage id="shared.delivery" />
          </h3>
          {renderDeliveryWidget()}
        </div>
        <Divider className="mt-24 mb-24" />
        <div className="search-page__filters-mob__item">
          <h3 className="text-headline mb-24">
            <FormattedMessage id="shared.moreFilters" />
          </h3>
          <div className="mb-24">
            <div className="in-black font-600 mb-24">
              <FormattedMessage id="shared.standardAmenities" />
            </div>
            <div className="search-page__filters-popover__column">
              {renderStandardAmenities()}
            </div>
          </div>
          <div className="mb-24">
            <div className="in-black font-600 mb-24">
              <FormattedMessage id="shared.luxuryAmenities" />
            </div>
            <div className="search-page__filters-popover__column">
              {renderLuxuryAmenities()}
            </div>
          </div>
          <div className="mb-24">
            <div className="in-black font-600 mb-24">
              <FormattedMessage id="shared.insideHeight" />
              <Tooltip title={<FormattedMessage {...FILTERS.INSIDE_HEIGHT_TOOLTIP} />}>
                <i className="icon icon-info-f main-tooltip-icon font-18" />
              </Tooltip>
            </div>
            <div className="search-page__filters-mob__input-row">
              {renderInsideHeight()}
            </div>
          </div>
          <div className="mb-24">
            <div className="in-black font-600 mb-24">
              <FormattedMessage id="shared.rules" />
            </div>
            <div className="search-page__filters-popover__column">
              {renderRules()}
            </div>
          </div>
          <div>
            <div className="in-black font-600 mb-24">
              <FormattedMessage id="shared.minimumRating" />
            </div>
            {renderRating({ isMobile: true })}
          </div>
        </div>
      </div>
      <div className="search-page__filters-mob__footer">
        <GradientButton
          text={{
            id: 'campervan-rental.filter.showVehiclesCount',
            values: { count: campersTotal },
          }}
          size="large"
          loading={areCampersFetching}
          disabled={areCampersFetching}
          onClick={toggleMobileFiltersVisibility}
        />
      </div>
    </aside>
  );
};

export default MobileView;
