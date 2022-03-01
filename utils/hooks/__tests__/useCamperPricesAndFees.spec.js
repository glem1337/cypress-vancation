import { act, renderHook } from '@testing-library/react-hooks';
import { dispatch } from '__mocks__/react-redux';
import React from 'react';

import { hideModal, showModal } from 'state/modal/actions';
import { searchDestinationParamsSelector } from 'state/concepts/search-destinations/selectors';
import mockedCamperPricing from 'views/CamperDetails/CamperPrices/__mocks__/camperPricing';
import { camperPricingAndFeesSelector } from 'state/concepts/camper/selectors';

import useCamperPricesAndFees from '../useCamperPricesAndFees';

jest.mock('lodash/debounce', () => fn => fn);

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => ({
    specificationDetail: {
      name: 'name',
      modelNaming: 'modelNaming',
    },
    camperPhotos: [
      { position: 2, photoUrl274: 'http://photoUrl274/com?position=2' },
      { position: 1, photoUrl274: 'http://photoUrl1100/com?position=1' },
    ],
    minimalPrice: 233,
  })),
  camperPricingAndFeesSelector: jest.fn(() => mockedCamperPricing),
}));

jest.mock('utils/breakpoints/isMobileView', () => jest.fn(() => true));
jest.mock('utils/breakpoints/isTabletView', () => jest.fn(() => true));

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    dateRange: null,
  })),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: { camper_id: 1234 } })),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

const mockedObserver = {
  observe: jest.fn(),
  unobserve: jest.fn(),
};
global.ResizeObserver = jest.fn(() => mockedObserver);

describe('useCamperPricesAndFees hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useCamperPricesAndFees));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('pricing date matches snapshot without camper and date range', () => {
    expect(result.current.pricingData).toMatchSnapshot();
  });

  it('pricing date matches snapshot with camper and date range', () => {
    searchDestinationParamsSelector.mockReturnValueOnce({ dateRange: [new Date(), new Date()] });

    ({ result } = renderHook(useCamperPricesAndFees));

    expect(result.current.pricingData).toMatchSnapshot();
  });

  it('checks `closeModal` method', () => {
    act(() => {
      result.current.closeModal();
    });

    expect(dispatch).toHaveBeenCalledWith(hideModal());
  });

  describe('checks `addResizeObserver` method', () => {
    it('should observe', () => {
      let res = null;

      jest.spyOn(React, 'useRef').mockReturnValue({ current: {} });

      ({ result } = renderHook(useCamperPricesAndFees));

      act(() => {
        res = result.current.addResizeObserver();
      });

      expect(res).toBe(true);
    });

    it('should not observe', () => {
      let res = null;

      jest.spyOn(React, 'useRef').mockReturnValue({ current: null });

      ({ result } = renderHook(useCamperPricesAndFees));

      act(() => {
        res = result.current.addResizeObserver();
      });

      expect(res).toBe(false);
    });
  });

  describe('checks `removeResizeObserver` method', () => {
    it('should unobserve', () => {
      jest.spyOn(React, 'useRef').mockReturnValue({ current: {} });

      ({ result } = renderHook(useCamperPricesAndFees));

      let res = null;

      act(() => {
        res = result.current.removeResizeObserver();
      });

      expect(res).toBe(true);
    });

    it('should not unobserve', () => {
      let res = null;

      jest.spyOn(React, 'useRef').mockReturnValue({ current: null });

      ({ result } = renderHook(useCamperPricesAndFees));

      act(() => {
        res = result.current.removeResizeObserver();
      });

      expect(res).toBe(false);
    });
  });

  describe('checks `resizeHandler` method', () => {
    it('should return true', () => {
      let res = null;

      React.useRef.mockRestore();

      ({ result } = renderHook(useCamperPricesAndFees));

      act(() => {
        res = result.current.handlers.current.resizeHandler();
      });

      expect(res).toBe(true);
    });
  });

  describe('checks `fetchCamperPricingAndFees` method', () => {
    it('should return false', () => {
      let res = null;

      ({ result } = renderHook(useCamperPricesAndFees));

      act(() => {
        res = result.current.fetchCamperPricingAndFees();
      });

      expect(res).toBe(false);
    });

    it('should return true', () => {
      let res = null;

      searchDestinationParamsSelector.mockReturnValueOnce({
        dateRange: [new Date(), new Date()],
      });

      ({ result } = renderHook(useCamperPricesAndFees));

      act(() => {
        res = result.current.fetchCamperPricingAndFees();
      });

      expect(res).toBe(true);
    });
  });

  it('checks `viewFeesAndProcessing` method', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    act(() => {
      result.current.viewFeesAndProcessing(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith((showModal({
      modalType: 'CAMPER_FEES_AND_PROCESSING_MODAL',
      modalProps: {
        camperPricingAndFees: mockedCamperPricing,
      },
    })));
  });

  describe('checks `getDiscountTooltipData` method', () => {
    it('default', () => {
      let res = null;

      act(() => {
        res = result.current.tooltipData;
      });

      expect(res).toMatchSnapshot();
    });

    it('weekly discount', () => {
      let res = null;

      camperPricingAndFeesSelector.mockReturnValueOnce({
        ...mockedCamperPricing,
        discountType: 'weekly_discount',
        discountPercent: 15,
      });

      ({ result } = renderHook(useCamperPricesAndFees));

      act(() => {
        res = result.current.tooltipData;
      });

      expect(res).toMatchSnapshot();
    });

    it('monthly discount', () => {
      let res = null;

      camperPricingAndFeesSelector.mockReturnValueOnce({
        ...mockedCamperPricing,
        discountType: 'monthly_discount',
        discountPercent: 22,
      });

      ({ result } = renderHook(useCamperPricesAndFees));

      act(() => {
        res = result.current.tooltipData;
      });

      expect(res).toMatchSnapshot();
    });
  });
});
