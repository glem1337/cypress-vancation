import React from 'react';
import PropTypes from 'prop-types';

const FooterLinksBlock = ({ title, linkArray }) => (
  <div className="footer__list-block">
    <div className="footer__list-title">
      {title}
    </div>
    <ul>
      {linkArray.map((item) => {
        const props = {
          className: 'footer__list-link',
          href: item.link,
        };

        if (item.target) {
          props.target = item.target;
          props.rel = item.rel;
        }

        return (
          <li className="footer__list-link-wrap" key={item.id}>
            <a {...props}>{item.txt}</a>
          </li>
        );
      })}
    </ul>
  </div>
);

FooterLinksBlock.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]).isRequired,
  linkArray: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default FooterLinksBlock;
