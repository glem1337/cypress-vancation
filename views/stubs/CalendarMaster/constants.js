import moment from 'moment';

export const currentDateRange = {
  from: moment('2021-04-12').startOf('day'),
  to: moment('2021-04-25').endOf('day'),
};

export const currentDate = moment('2021-04-19');

export const VANS_STATUSES = {
  published: 'Published',
  unpublished: 'Unpublished',
};

export const vansMock = [
  {
    info: {
      title: 'Adventure Ready Class B Camper Rocky Mountains',
      slug: 'super-van-145645',
      status: VANS_STATUSES.published,
      image: {
        imgUrl: 'https://placeimg.com/68/68/nature',
        imgUrlRetina: 'https://placeimg.com/136/136/nature',
      },
    },

    dates: [
      {
        from: moment('2021-04-16 14:00'),
        to: moment('2021-04-19 12:00'),
        prices: [400, 500, 550],
      },
      {
        from: moment('2021-04-20 14:00'),
        to: moment('2021-04-21 12:00'),
        prices: [400],
      },
    ],

    bookings: [
      {
        from: moment('2021-04-10 12:00'),
        to: moment('2021-04-14 14:00'),
        details: {
          peopleCount: 2,
          nightsCount: 2,
          total: 1500,
        },
      },
    ],
  },
  {
    info: {
      title: 'Adventure Ready Class B Camper Rocky Mountains',
      slug: 'super-van-145646',
      status: VANS_STATUSES.published,
      image: {
        imgUrl: 'https://placeimg.com/68/68/nature',
        imgUrlRetina: 'https://placeimg.com/136/136/nature',
      },
    },

    dates: [
      {
        from: moment('2021-04-12 14:00'),
        to: moment('2021-04-13 12:00'),
        prices: [400],
      },
      {
        from: moment('2021-04-14 14:00'),
        to: moment('2021-04-16 12:00'),
        prices: [400, 450],
      },
      {
        from: moment('2021-04-20 14:00'),
        to: moment('2021-04-24 12:00'),
        prices: [400, 450, 400, 400],
      },
    ],

    bookings: [
      {
        from: moment('2021-04-13 14:00'),
        to: moment('2021-04-14 20:00'),
        details: {
          peopleCount: 2,
          nightsCount: 2,
          total: 1500,
        },
      },
    ],
  },
  {
    info: {
      title: 'Adventure Ready Class 2',
      slug: 'super-van-145647',
      status: VANS_STATUSES.published,
      image: {
        imgUrl: 'https://placeimg.com/68/68/nature',
        imgUrlRetina: 'https://placeimg.com/136/136/nature',
      },
    },

    dates: [
      {
        from: moment('2021-04-16 14:00'),
        to: moment('2021-04-19 12:00'),
        prices: [400, 500, 550],
      },
      {
        from: moment('2021-04-20 14:00'),
        to: moment('2021-04-21 12:00'),
        prices: [400],
      },
    ],

    bookings: [
      {
        from: moment('2021-04-17 14:00'),
        to: moment('2021-04-20 12:00'),
        details: {
          peopleCount: 2,
          nightsCount: 2,
          total: 1500,
        },
      },
    ],
  },
  {
    info: {
      title: 'Adventure Ready Class 2',
      slug: 'super-van-145648',
      status: VANS_STATUSES.unpublished,
      image: {
        imgUrl: 'https://placeimg.com/68/68/nature',
        imgUrlRetina: 'https://placeimg.com/136/136/nature',
      },
    },

    dates: [
      {
        from: moment('2021-04-12 14:00'),
        to: moment('2021-04-13 12:00'),
        prices: [400],
      },
      {
        from: moment('2021-04-14 14:00'),
        to: moment('2021-04-16 12:00'),
        prices: [400, 450],
      },
      {
        from: moment('2021-04-20 14:00'),
        to: moment('2021-04-24 12:00'),
        prices: [400, 450, 400, 400],
      },
    ],

    bookings: [
      {
        from: moment('2021-04-11 16:00'),
        to: moment('2021-04-28 12:00'),
        details: {
          peopleCount: 2,
          nightsCount: 2,
          total: 1500,
        },
      },
    ],
  },
  {
    info: {
      title: 'Adventure Ready Class 2',
      slug: 'super-van-145649',
      status: VANS_STATUSES.unpublished,
      image: {
        imgUrl: 'https://placeimg.com/68/68/nature',
        imgUrlRetina: 'https://placeimg.com/136/136/nature',
      },
    },

    dates: [
      {
        from: moment('2021-04-16 14:00'),
        to: moment('2021-04-19 12:00'),
        prices: [400, 500, 550],
      },
      {
        from: moment('2021-04-20 14:00'),
        to: moment('2021-04-21 12:00'),
        prices: [400],
      },
    ],

    bookings: [
      {
        from: moment('2021-04-23 16:00'),
        to: moment('2021-04-27 12:00'),
        details: {
          peopleCount: 2,
          nightsCount: 2,
          total: 1500,
        },
      },
    ],
  },
];
