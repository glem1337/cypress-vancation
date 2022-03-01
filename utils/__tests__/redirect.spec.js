import Router from 'next/router';
import redirect from '../redirect';

jest.mock('next/router', () => ({
  push: jest.fn(),
  replace: jest.fn(),
}));

describe('redirect()', () => {
  const destination = '/redirect/route';
  const res = {
    writeHead: jest.fn(),
    end: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('performs http redirect on SSR', () => {
    redirect(destination, { res });

    expect(res.writeHead).toHaveBeenCalledWith(302, { Location: destination });
    expect(res.end).toHaveBeenCalledWith();
  });

  it('performs redirect in browser', () => {
    redirect(destination, {});

    expect(Router.push).toHaveBeenCalledWith(destination);
  });

  it('redirects with specific method', () => {
    redirect(destination, {}, 'replace');

    expect(Router.replace).toHaveBeenCalledWith(destination);
  });
});
