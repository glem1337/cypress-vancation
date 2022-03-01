import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';

import useContainer from './hook';

const CollapsibleText = ({ children }) => {
  const { collapsed, setCollapsed } = useContainer();

  return (
    <div className="search-page__collapsible">
      <div
        className={classNames(
          'search-page__collapsible-text',
          !collapsed && 'search-page__collapsible-text--open',
        )}
      >
        {children}
      </div>
      <Button type="simple-text" className="ant-btn-flat mt-4" onClick={setCollapsed}>
        {collapsed
          ? <FormattedMessage id="shared.showMore" />
          : <FormattedMessage id="shared.showLess" />}
      </Button>
    </div>
  );
};

CollapsibleText.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CollapsibleText;
