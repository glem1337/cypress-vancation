import { Button, Spin } from 'antd';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';

import useButtonGradient from 'utils/hooks/useButtonGradient';

const BtnGradient = ({
 text,
 className,
 isLoading,
 ...rest
}) => {
  const { containerRef } = useButtonGradient();

  const intl = useIntl();

  const classes = `main-btn--gradient ${className}`;

  const label = typeof text === 'object' && text.id
    ? intl.formatMessage(text)
    : text;

  return (
    <Button
      {...rest}
      className={classes}
      ref={containerRef}
    >
      <span className="main-btn__gradient-content">
        {isLoading
          ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 20, color: '#fff' }} spin />}
            />
          )
          : label
        }
      </span>
      <span className="main-btn__gradient-inner" />
    </Button>
  );
};

BtnGradient.defaultProps = {
  className: '',
  isLoading: false,
};

BtnGradient.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default BtnGradient;
