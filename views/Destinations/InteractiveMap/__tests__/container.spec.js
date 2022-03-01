import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import mapboxgl from 'mapbox-gl';

import { CAMPERVAN_RENTAL } from 'constants/mapbox';
import mockedCamper from 'views/__mocks__/camper';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import { setActiveCamperId } from 'state/concepts/search-destinations/actions';

import InteractiveMapMobile, { InteractiveMapMobileContainer } from '../container';

const mockedMarker = {
  setLngLat: jest.fn(),
  addTo: jest.fn(),
};
jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
    fitBounds: jest.fn(),
  })),
  LngLatBounds: jest.fn(() => ({
    extend: jest.fn(() => ({})),
  })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn(() => mockedMarker),
    addTo: jest.fn(() => mockedMarker),
  })),
  Point: jest.fn(),
}));

jest.mock('@turf/turf', () => ({
  circle: jest.fn(() => ({
    geometry: {
      coordinates: [
        [[23.23124, 23.23124]],
      ],
    },
  })),
  distance: jest.fn(() => 100),
}));

jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  campersSelector: jest.fn(() => [mockedCamper, mockedCamper]),
}));

jest.mock('state/concepts/search-destinations/selectors', () => ({
  activeCamperIdSelector: jest.fn(() => '1'),
  searchDestinationParamsSelector: jest.fn(() => ({
    location: {
      id: 1,
      longitude: 1,
      latitude: 2,
      searchRadius: 123,
    },
  })),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<InteractiveMapMobile {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, InteractiveMapMobileContainer);
  const instance = container.instance();
  const setStateSpy = jest.spyOn(instance, 'setState');

  return {
    container,
    instance,
    setStateSpy,
  };
};

describe('InteractiveMapMobile container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    longitude: 1,
    latitude: 2,
    searchRadius: 4,
    createMapOnMount: false,
    isVisible: true,
    onZoomEnd: jest.fn(),
    onDragEnd: jest.fn(),
  };

  let container = null;
  let instance = null;

  beforeEach(() => {
    ({
      container,
      instance,
    } = layoutContainer(props));

    instance.mapContainerRef = {
      current: {
        removeChild: jest.fn(),
        appendChild: jest.fn(),
        querySelectorAll: jest.fn(() => [{
          classList: {
            add: jest.fn(),
            remove: jest.fn(),
          },
        }]),
        getBoundingClientRect: jest.fn(() => ({
          height: 1000,
          width: 222,
        })),
        style: {
          setProperty: jest.fn(),
          removeProperty: jest.fn(),
        },
      },
    };

    instance.mapRef = {
      current: {
        on: jest.fn(),
        off: jest.fn(),
        resize: jest.fn(),
        fitBounds: jest.fn(),
        unproject: jest.fn(() => 1),
        getCenter: jest.fn(() => ({
          lat: 1,
          lng: 2,
        })),
        flyTo: jest.fn(),
      },
    };

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('checks `componentDidMount` instance method', () => {
    it('should not create map', () => {
      const createMapSpy = jest.spyOn(instance, 'createMap');

      instance.componentDidMount();

      expect(createMapSpy).not.toHaveBeenCalled();
    });

    it('should create map', () => {
      container.setProps({ createMapOnMount: true });

      const createMapSpy = jest.spyOn(instance, 'createMap');

      instance.componentDidMount();

      expect(createMapSpy).toHaveBeenCalled();
    });
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('should not update', () => {
      const highlightCamperMarkerSpy = jest.spyOn(instance, 'highlightCamperMarker');

      instance.componentDidUpdate({ activeCamperId: '1' });

      expect(highlightCamperMarkerSpy).not.toHaveBeenCalled();
    });

    it('should update', () => {
      const highlightCamperMarkerSpy = jest.spyOn(instance, 'highlightCamperMarker');

      instance.componentDidUpdate({ activeCamperId: '2' });

      expect(highlightCamperMarkerSpy).toHaveBeenCalled();
    });
  });

  it('checks `componentWillUnmount` instance method', () => {
    instance.mapRef = {
      current: {
        off: jest.fn(),
      },
    };

    instance.componentWillUnmount();

    expect(instance.mapRef.current.off).toHaveBeenNthCalledWith(1, 'load', instance.onMapLoadHandler);
    expect(instance.mapRef.current.off).toHaveBeenNthCalledWith(2, 'touchstart', instance.onTouchStart);
  });

  describe('checks `resizeMap` instance method', () => {
    it('should not create map', () => {
      instance.resizeMap();

      expect(instance.mapRef.current.resize).toHaveBeenCalled();
    });

    it('should create map', () => {
      const createMapSpy = jest.spyOn(instance, 'createMap');

      instance.mapRef = {
        current: null,
      };

      instance.resizeMap();

      expect(createMapSpy).toHaveBeenCalled();
    });
  });

  describe('checks `onTouchStart` instance method', () => {
    it('should return false', () => {
      const res = instance.onTouchStart();

      expect(res).toBe(false);
    });

    it('should return true', () => {
      container.setProps({ onTouchStart: () => {} });

      const res = instance.onTouchStart();

      expect(res).toBe(true);
    });
  });

  it('checks `getRefs` instance method', () => {
    const refs = instance.getRefs();

    expect(refs).toEqual(({
      mapRef: instance.mapRef,
      mapContainerRef: instance.mapContainerRef,
    }));
  });

  describe('checks `fitMapToBounds` instance method', () => {
    it('should fit map to bounds', () => {
      instance.fitMapToBounds();

      expect(instance.mapRef.current.fitBounds).toHaveBeenCalled();
    });

    it('should create new map', () => {
      const createMapSpy = jest.spyOn(instance, 'createMap');

      instance.mapRef = {
        current: null,
      };

      instance.fitMapToBounds();

      expect(createMapSpy).toHaveBeenCalled();
    });
  });

  describe('checks `onMapLoadHandler` instance method', () => {
    it('should return false', async () => {
      instance.mapContainerRef.current = null;

      const res = await instance.onMapLoadHandler();

      expect(res).toBe(false);
    });

    it('should resize map', async () => {
      const fitMapToBoundsSpy = jest.spyOn(instance, 'fitMapToBounds');

      const res = await instance.onMapLoadHandler();

      expect(res).toBe(true);
      expect(instance.mapRef.current.resize).toHaveBeenCalled();
      expect(fitMapToBoundsSpy).toHaveBeenCalled();

      expect(instance.mapRef.current.on).toHaveBeenCalledWith('touchstart', instance.onTouchStart);
      expect(instance.mapRef.current.on).toHaveBeenCalledWith('dragend', instance.onDragEndDebounced);
      expect(instance.mapRef.current.on).toHaveBeenCalledWith('zoomend', instance.onZoomEndDebounced);
    });
  });

  describe('checks `createMap` instance method', () => {
    it('should return false', async () => {
      const res = await instance.createMap();

      expect(res).toBe(false);
    });

    it('should create new map', async () => {
      instance.mapRef = {
        current: null,
      };

      const res = await instance.createMap();

      expect(res).toBe(true);

      expect(mapboxgl.Map).toHaveBeenCalledWith({
        container: instance.mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [props.longitude, props.latitude],
        zoom: CAMPERVAN_RENTAL.MAP_ZOOM,
      });
      expect(instance.mapRef.current.on).toHaveBeenCalledWith('load', instance.onMapLoadHandler);
    });
  });

  describe('checks `createMarkers` instance method', () => {
    it('should return true', async () => {
      const deleteAllMarkersSpy = jest.spyOn(instance, 'deleteAllMarkers');

      const res = await instance.createMarkers();

      expect(res).toBe(true);
      expect(deleteAllMarkersSpy).toHaveBeenCalled();
    });
  });

  describe('checks `onMarkerVisibleChange` instance method', () => {
    it('should not set active camper id', () => {
      instance.onMarkerVisibleChange();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should set active camper id', () => {
      instance.onMarkerVisibleChange(true, '1');

      expect(store.dispatch).toHaveBeenCalledWith(setActiveCamperId('1'));
    });
  });

  it('checks `searchAsMoveMapToggled` instance method', () => {
    instance.searchAsMoveMapToggled({ target: { checked: true } });

    expect(instance.searchAsMoveMap).toBe(true);
  });

  describe('checks `getMapRadius` instance method', () => {
    it('should return distance', () => {
      const distance = instance.getMapRadius();

      expect(distance).toBe(100);
    });

    it('should return null', () => {
      instance.mapRef = {
        current: null,
      };

      const distance = instance.getMapRadius();

      expect(distance).toBe(null);
    });
  });

  describe('checks `highlightCamperMarker` instance method', () => {
    it('should return true', async () => {
      const markersWrapper = document.createElement('div');

      for (let i = 0; i < 4; i += 1) {
        const markerParent = document.createElement('div');
        markerParent.id = i;

        const marker = document.createElement('div');
        marker.classList.add('search-page__map-pin');

        markerParent.appendChild(marker);
        markersWrapper.appendChild(markerParent);
      }

      document.body.appendChild(markersWrapper);

      const res = await instance.highlightCamperMarker();

      expect(res).toBe(true);
    });

    it('should return false', async () => {
      Object.defineProperty(
        document,
        'querySelectorAll',
        { value: jest.fn(() => [{}]) },
      );

      const res = await instance.highlightCamperMarker();

      expect(res).toBe(false);
    });
  });

  describe('checks `onDragEnd` instance method', () => {
    it('should not search', async () => {
      instance.searchAsMoveMap = false;

      const res = await instance.onDragEnd();

      expect(res).toBe(false);
    });

    it('should search', async () => {
      instance.searchAsMoveMap = true;

      const res = await instance.onDragEnd();

      expect(props.onDragEnd).toHaveBeenCalledWith({
        map: instance.mapRef.current,
        mapContainer: instance.mapContainerRef.current,
        mapRadius: instance.getMapRadius(),
        center: {
          latitude: 1,
          longitude: 2,
        },
      });
      expect(res).toBe(true);
    });
  });

  describe('checks `onZoomEnd` instance method', () => {
    it('should not search', async () => {
      instance.searchAsMoveMap = false;

      const res = await instance.onZoomEnd();

      expect(res).toBe(false);
    });

    it('should search', async () => {
      instance.searchAsMoveMap = true;

      const res = await instance.onZoomEnd();

      expect(props.onZoomEnd).toHaveBeenCalledWith({
        map: instance.mapRef.current,
        mapContainer: instance.mapContainerRef.current,
        mapRadius: instance.getMapRadius(),
        center: {
          latitude: 1,
          longitude: 2,
        },
      });
      expect(res).toBe(true);
    });
  });

  it('checks `deleteAllMarkers` instance method', () => {
    instance.markers = [{ remove: jest.fn() }];

    instance.deleteAllMarkers();

    expect(instance.markers).toEqual([]);
  });

  describe('checks `setCenter` instance method', () => {
    it('should not create map', () => {
      instance.setCenter({ latitude: 1, longitude: 2 });

      expect(instance.mapRef.current.flyTo).toHaveBeenCalledWith({ center: [2, 1] });
    });

    it('should create map', () => {
      const createMapSpy = jest.spyOn(instance, 'createMap');

      instance.mapRef = {
        current: null,
      };

      instance.setCenter({ latitude: 1, longitude: 2 });

      expect(createMapSpy).toHaveBeenCalled();
    });
  });

  describe('checks `setVisibilityByWidth` instance method', () => {
    it('when is visible', () => {
      instance.setVisibilityByWidth(true);

      expect(instance.mapContainerRef.current.style.setProperty).toHaveBeenCalledWith('width', 0);
    });

    it('when is not visible', () => {
      instance.setVisibilityByWidth(false);

      expect(instance.mapContainerRef.current.style.removeProperty).toHaveBeenCalledWith('width');
    });

    it('when error', () => {
      instance.mapContainerRef = {};

      const res = instance.setVisibilityByWidth(false);

      expect(res).toBe(false);
    });
  });
});
