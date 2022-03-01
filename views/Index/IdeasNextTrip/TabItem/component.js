import { Col, Row } from 'antd';
import Classnames from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { NEXT_TRIP_DEFAULT_SHOW_ITEMS } from 'constants/home';

const TabItem = ({
  items,
}) => (
  <Row>
    {items.map(({ id, title, subtitle, link }, key) => (
      <Col
        key={id}
        span={12}
        md={8}
        xl={4}
        className={Classnames({
          'home-ideas-next-trip__extra-item': (key + 1) > NEXT_TRIP_DEFAULT_SHOW_ITEMS,
          'home-ideas-next-trip__normal-item': (key + 1) <= NEXT_TRIP_DEFAULT_SHOW_ITEMS,
        })}
      >
        <Link href={link}>
          <a className="d-inline-block mb-24">
            <p className="mb-4 text-subheader font-400">
              {title}
            </p>
            {subtitle && (
              <p className="text-color-gray">
                {subtitle}
              </p>
            )}
          </a>
        </Link>
      </Col>
    )) }
  </Row>
);

TabItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      link: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TabItem;
