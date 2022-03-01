import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const Loader = ({
  fontSize,
}) => (
  <Spin
    indicator={
      <LoadingOutlined style={{ fontSize }} spin />
    }
  />
);

Loader.propTypes = {
  fontSize: PropTypes.number.isRequired,
};

export default Loader;
