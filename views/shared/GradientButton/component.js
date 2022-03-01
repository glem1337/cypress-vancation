import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { is } from 'ramda';

import useButtonGradient from 'utils/hooks/useButtonGradient';

const GradientButton = ({ text, className, ...rest }) => {
  const { containerRef } = useButtonGradient();

  return (
    <Button
      {...rest}
      className={classNames('main-btn--gradient', className)}
      ref={containerRef}
    >
      <span>
        {is(Object, text)
          ? <FormattedMessage {...text} />
          : text
        }
      </span>
      <span className="main-btn__gradient-inner" />
    </Button>
  );
};

GradientButton.defaultProps = {
  className: null,
};

GradientButton.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.string,
  ]).isRequired,
  className: PropTypes.string,
};

export default GradientButton;
