export const mockedFetchGeocoder = {
  type: 'FeatureCollection',
  query: ['das'],
  features: [
    {
      id: 'poi.257698094326',
      type: 'Feature',
      place_type: ['poi'],
      relevance: 1,
      properties: {
        foursquare: '4bad1637f964a5203a2c3be3',
        landmark: true,
        address: '1 Busch Gardens Blvd',
        category: 'gift, novelty, shop, gift shop',
      },
      text: 'Das Festhaus - Busch Gardens',
      place_name: 'Das Festhaus - Busch Gardens, 1 Busch Gardens Blvd, Williamsburg, Virginia 23185, United States',
      center: [-76.646441, 37.23116],
      geometry: { coordinates: [-76.646441, 37.23116], type: 'Point' },
      context: [
        { id: 'neighborhood.288395', text: 'Kingsmill' }, {
          id: 'postcode.9826277123986190',
          text: '23185',
        },
        { id: 'place.15156657178081640', wikidata: 'Q492346', text: 'Williamsburg' }, {
          id: 'district.9376275471344720',
          wikidata: 'Q337688',
          text: 'James City County',
        },
        {
          id: 'region.7919684583758790',
          wikidata: 'Q1370',
          short_code: 'US-VA',
          text: 'Virginia',
        },
        {
          id: 'country.19678805456372290',
          wikidata: 'Q30',
          short_code: 'us',
          text: 'United States',
        },
      ],
    },
  ],
  attribution: 'NOTICE: © 2021 Mapbox and its suppliers.',
};

export const mockedGeocoderList = [
  {
    id: 'poi.257698094326',
    place: 'Das Festhaus - Busch Gardens, 1 Busch Gardens Blvd, Williamsburg, Virginia 23185, United States',
    longitude: -76.646441,
    latitude: 37.23116,
  },
];
