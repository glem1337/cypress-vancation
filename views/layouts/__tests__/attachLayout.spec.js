import { shallow } from 'enzyme';

import attachLayout from '../attachLayout';

// eslint-disable-next-line react/prop-types
const MockLayout = ({ children }) => (
  <div>
    <p>
      Layout
    </p>
    {children}
  </div>
);
MockLayout.getInitialProps = jest.fn();

const MockPage = () => (
  <p>
    Page
  </p>
);
MockPage.getInitialProps = jest.fn();

describe('attachLayout()() HOC', () => {
  const props = { className: 'className' };

  const PageWithLayout = attachLayout(MockLayout, props)(MockPage);

  it('matches snapshot', () => {
    expect(shallow(<PageWithLayout />)).toMatchSnapshot();
  });

  it('has right display name', () => {
    expect(PageWithLayout.displayName).toEqual('attachLayout(MockLayout)(MockPage)');
  });

  it('runs getInitialProps for layout and page components, passes down ctx', async () => {
    const ctx = { some: 'context' };
    await PageWithLayout.getInitialProps(ctx);
    expect(MockLayout.getInitialProps).toHaveBeenCalledWith(ctx, props);
    expect(MockPage.getInitialProps).toHaveBeenCalledWith(ctx);
  });
});
