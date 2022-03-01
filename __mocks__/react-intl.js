import React from 'react';

import fakeIntl from 'utils/testHelpers/fakeIntl';

const Intl = jest.genMockFromModule('react-intl');
// InjectIntl wrapping component written as a class to mimic the exact
// behaviour of injectIntl and allow to use
// enzyme's shallow_wrapper.instance() method

Intl.injectIntl = (Node) => {
  // eslint-disable-next-line react/prefer-stateless-function
  class InjectIntl extends React.Component {
    static displayName = `injectIntl(${Node.displayName
      || Node.name
      || 'Component'})`;

    render = () => <Node {...this.props} intl={fakeIntl} />;
  }
  return InjectIntl;
};

Intl.useIntl = () => fakeIntl;

module.exports = Intl;
