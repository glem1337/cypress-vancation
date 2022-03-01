import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { debounce } from 'lodash';
import moment from 'moment';

import { camperSelector, camperPricingAndFeesSelector } from 'state/concepts/camper/selectors';
import { fetchCamperPricingAndFees as fetchCamperPricingAndFeesAction } from 'state/concepts/camper/actions';
import { fetchCamperPricingAndFeesEndpoint } from 'state/concepts/camper/endpoints';
import { CAMPER_PHOTO_DEFAULT } from 'constants/camper';
import isInstantBook from 'utils/camper/isInstantBook';
import { hideModal, showModal } from 'state/modal/actions';
import isPresent from 'utils/isPresent';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';
import { loadingSelector } from 'state/data/selectors';

function useCamperPricesAndFees() {
  const router = useRouter();

  const camperId = R.path(['query', 'camper_id'], router);

  const dispatch = useDispatch();

  const searchParams = useSelector(searchDestinationParamsSelector);

  const camperPricingAndFees = useSelector(camperPricingAndFeesSelector);

  const isCamperPricingAndFeesFetching = useSelector(
    state => loadingSelector(
      state,
      fetchCamperPricingAndFeesEndpoint.endpoint,
    ),
  );

  const intl = useIntl();

  const [, setResizeUUID] = useState(null);

  const containerRef = useRef();

  const observer = useRef();

  const handlers = useRef({
    /**
     * Handle resize.
     */
    resizeHandler: debounce(() => {
      setResizeUUID(uuid());

      return true;
    }, 400),
 });

  const camper = useSelector(state => camperSelector(
    state,
    camperId,
  ));

  // Make, model
  const campervanMake = R.path(['specificationDetail', 'name'], camper);
  const campervanModel = R.path(['specificationDetail', 'modelNaming'], camper);

  // Main photo
  const mainPhotoUrl = R.compose(
    R.defaultTo(CAMPER_PHOTO_DEFAULT),
    R.prop('photoUrl274'),
    R.defaultTo({}),
    R.head,
    R.sort((a, b) => a.position - b.position),
    R.defaultTo([]),
    R.path(['camperPhotos']),
  )(camper);

  /**
   * Close modal.
   */
  const closeModal = () => {
    dispatch(hideModal());
  };

  /**
   * Add resize observer.
   */
   const addResizeObserver = () => {
    if (!containerRef?.current) {
      return false;
    }

    observer.current = new ResizeObserver(handlers.current.resizeHandler);

    observer.current.observe(containerRef.current);

    return true;
  };

  /**
   * Remove resize observer.
   */
  const removeResizeObserver = () => {
    if (!containerRef.current || !observer.current) {
      return false;
    }

    observer.current.unobserve(containerRef.current);

    return true;
  };

  /**
   * Fetch camper pricing and fees.
   */
  const fetchCamperPricingAndFees = () => {
    const startDate = R.path(['dateRange', '0'], searchParams);
    const endDate = R.path(['dateRange', '1'], searchParams);

    if (!isPresent(camperId) || !isPresent(startDate) || !isPresent(endDate)) {
      return false;
    }

    dispatch(fetchCamperPricingAndFeesAction({
      camperId,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    }));

    return true;
  };

  /**
   * Create pricing data.
   */
  const createPricingData = () => {
    const startDate = R.path(['dateRange', '0'], searchParams);
    const endDate = R.path(['dateRange', '1'], searchParams);

    if (!isPresent(camperId) || !isPresent(startDate) || !isPresent(endDate)) {
      return {
        costPerNight: camper?.minimalPrice,
      };
    }

    const nightString = intl.formatMessage({ id: 'shared.night' }).toLowerCase();

    const bookingInfo = !isPresent(camperPricingAndFees?.bookingNightlyRate)
      || !isPresent(camperPricingAndFees?.bookingDuration)
      ? null
      : {
        string: `$${camperPricingAndFees?.costPerNight} x ${camperPricingAndFees?.bookingDuration} ${nightString}`,
        total: `$${camperPricingAndFees?.bookingNightlyRate}`,
      };

    return {
      costPerNight: camperPricingAndFees?.costPerNight,
      nightString: ` / ${nightString}`,
      bookingInfo,
      feesProcessingPriceString: isPresent(camperPricingAndFees?.feesProcessingPrice)
        ? `$${camperPricingAndFees.feesProcessingPrice}`
        : null,
      totalPrice: camperPricingAndFees?.totalPrice,
    };
  };

  /**
   * View  fees and processing.
   */
  const viewFeesAndProcessing = (event) => {
    event.preventDefault();

    dispatch(showModal({
      modalType: 'CAMPER_FEES_AND_PROCESSING_MODAL',
      modalProps: {
        camperPricingAndFees,
      },
    }));
  };

  /**
   * Get discounts tooltip data.
   */
  const getDiscountTooltipData = () => {
    let tooltip = intl.formatMessage({ id: 'camperDetails.book.modal.tooltip.averageNightlyRate' });

    const discountPercent = camperPricingAndFees?.discountPercent;

    if (camperPricingAndFees?.discountType === 'weekly_discount' && discountPercent > 0) {
      tooltip = intl.formatMessage({ id: 'camperDetails.book.modal.tooltip.weeklyDiscount' }, { value: discountPercent });
    }

    if (camperPricingAndFees?.discountType === 'monthly_discount' && discountPercent > 0) {
      tooltip = intl.formatMessage({ id: 'camperDetails.book.modal.tooltip.monthlyDiscount' }, { value: discountPercent });
    }

    return tooltip;
  };

  /**
   * Mounting.
   */
  useEffect(() => {
    addResizeObserver();

    return removeResizeObserver;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Updating.
   */
  useEffect(() => {
    fetchCamperPricingAndFees();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camperId, searchParams?.dateRange]);

  return {
    containerRef,
    campervanMake,
    campervanModel,
    mainPhotoUrl,
    isInstantBook: isInstantBook(camper),
    closeModal,
    addResizeObserver,
    removeResizeObserver,
    handlers,
    fetchCamperPricingAndFees,
    camperPricingAndFees,
    pricingData: createPricingData(),
    viewFeesAndProcessing,
    isCamperPricingAndFeesFetching,
    costPerNight: camperPricingAndFees?.costPerNight || camper?.minimalPrice,
    isCamperExist: isPresent(camper),
    camper,
    tooltipData: getDiscountTooltipData(),
  };
}

export default useCamperPricesAndFees;
