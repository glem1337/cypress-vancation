import Axios from 'axios';
import qs from 'qs';

import buildHttpClient from '../index';

jest.mock('axios', () => ({
  create: jest.fn(),
}));

jest.mock('qs', () => ({
  stringify: jest.fn(),
}));

describe('buildHttpClient()', () => {
  it('returns new instance of axios', () => {
    buildHttpClient();

    const createArgs = Axios.create.mock.calls[0][0];
    expect(createArgs).toMatchSnapshot();

    createArgs.paramsSerializer({});
    expect(qs.stringify).toHaveBeenCalledWith({}, { arrayFormat: 'brackets' });
  });
});
