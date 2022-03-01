import endpoint from '../endpoint';

it('returns enpoint object', () => {
  expect(endpoint('FEATURE NAME', 'GET', '/route')).toEqual({
    endpoint: 'FEATURE NAME GET /route',
    url: '/route',
  });
});
