import React from 'react';
import PropTypes from 'prop-types';

import getDisplayName from 'utils/getDisplayName';

const attachLayout = (Layout, layoutProps) => (Component) => {
  class AttachLayout extends React.PureComponent {
    static Layout = Layout;

    static layoutProps = layoutProps;

    static displayName = `attachLayout(${getDisplayName(Layout)})(${getDisplayName(Component)})`;

    static defaultProps = {
      componentInitialProps: null,
    };

    static propTypes = {
      componentInitialProps: PropTypes.shape(),
    };

    static getInitialProps = async (ctx) => {
      if (Layout.getInitialProps) {
        await Layout.getInitialProps(ctx, layoutProps);
      }

      const componentInitialProps = Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {};

      return { componentInitialProps };
    };

    render = () => {
      const { componentInitialProps, ...props } = this.props;

      return (
        <Component {...props} {...componentInitialProps} />
      );
    };
  }

  return AttachLayout;
};

export default attachLayout;
