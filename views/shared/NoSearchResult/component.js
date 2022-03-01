import { FormattedMessage } from 'react-intl';

const NoSearchResult = () => (
  <div className="main-page__empty">
    <div className="main-page__empty-content">
      <img className="main-page__empty-image" src="/images/auth/empty_search.svg" alt="" />
      <p className="main-page__empty-text">
        <FormattedMessage id="shared.noSearchResult" />
      </p>
    </div>
  </div>
);

export default NoSearchResult;
