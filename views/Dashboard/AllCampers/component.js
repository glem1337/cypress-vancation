import { Pagination, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Classnames from 'classnames';

import isPresent from 'utils/isPresent';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import ROUTES from 'constants/routes';

import UserFooter from 'views/shared/UserFooter';
import EmptyCamper from 'views/shared/EmptyCamper';
import BtnGradient from 'views/shared/BtnGradient';

import Header from '../Header';
import Search from './Search';
import FilterStatus from './FilterStatus';
import CamperCard from './CamperCard';

const DashboardAllCampersComponent = ({
  ownerCampersPagination,
  handlerPagination,
  isLoading,
  campers,
  onStatusChange,
  onSearchChange,
  filters,
  specificCamperIsPresent,
}) => (
  <>
    <Header activeTabKey={ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.KEY} />
    <div id="main-account-wrap-master" className="main-account-wrap--listing">
      <div
        className={Classnames('container w-100', {
          'd-flex flex-column': !campers.length,
        })}
      >
        <div className="d-flex align-items-center justify-content-space-between mb-24">
          <div className="text-headline">
            <FormattedMessage id="shared.campers" />
          </div>
          {isPresent(campers) && (
            <a
              href={createRouteFromPathname(
                ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH,
                'id',
              )}
              target="_blank"
              rel="noreferrer"
            >
              <BtnGradient text={{ id: 'shared.listYourCamper' }} />
            </a>
          )}
        </div>
        <div className="master-view-wrap">
          {!specificCamperIsPresent && (
            <div className="d-flex align-items-center relative mb-16">
              <Search onChange={onSearchChange} />
              <FilterStatus
                status={filters.status}
                onStatusChange={onStatusChange}
              />
            </div>
          )}
          {isPresent(campers) && !isLoading && (
            <div>
              <div className="master-view-card-table-header">
                <div className="mr-auto">
                  <FormattedMessage id="shared.camper" />
                </div>
                <div className="master-view-card__id">
                  <FormattedMessage id="shared.id" />
                </div>
                <div className="master-view-card__status">
                  <FormattedMessage id="shared.status" />
                </div>
                <div className="master-view-card__insurance">
                  <FormattedMessage id="shared.insurance" />
                </div>
                <div className="master-view-card__options" />
              </div>
              {campers.map((camper) => (
                <CamperCard
                  key={camper.id}
                  id={camper.id}
                  modelNaming={camper.modelNaming}
                  publicId={camper.publicId}
                  status={camper.status}
                  insurance={camper.insurance}
                  img={camper.img}
                  rating={camper.rating}
                  title={camper.title}
                  description={camper.description}
                  place={camper.place}
                />
              ))}
            </div>
          )}
          {isLoading && (
            <Skeleton paragraph={{ rows: 8 }} className="mb-12" active />
          )}
          {!specificCamperIsPresent && (
            <div className="d-flex">
              <Pagination
                className="master-view-pagination mr-auto ml-auto mr-md-0"
                hideOnSinglePage
                disabled={isLoading}
                onChange={handlerPagination}
                current={ownerCampersPagination.number}
                total={ownerCampersPagination.total}
                pageSize={ownerCampersPagination.size}
                showSizeChanger={false}
                showLessItems
              />
            </div>
          )}
          {!isPresent(campers) && !isLoading && <EmptyCamper />}
        </div>
      </div>
    </div>
    <UserFooter />
  </>
);

DashboardAllCampersComponent.defaultProps = {
  isLoading: false,
};

DashboardAllCampersComponent.propTypes = {
  isLoading: PropTypes.bool,
  onStatusChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  handlerPagination: PropTypes.func.isRequired,
  ownerCampersPagination: PropTypes.shape({
    number: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  campers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  filters: PropTypes.shape().isRequired,
  specificCamperIsPresent: PropTypes.bool.isRequired,
};

export default DashboardAllCampersComponent;
