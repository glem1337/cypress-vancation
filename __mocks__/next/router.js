import * as Router from 'next/router';

export const router = {
  push: jest.fn(),
  replace: jest.fn(),
  query: {},
};

export const useRouter = jest.fn(() => router);
export const { withRouter } = Router;
