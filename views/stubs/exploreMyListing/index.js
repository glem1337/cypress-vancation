import { Pagination, Tag } from 'antd';
import Header from 'views/stubs/layout/headers/headerOwnerDashboard/Header';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';
import Filters from './components/Filters';
import CamperCard from './components/CamperCard';

const ExploreMyListing = () => (
  <>
    <Header />
    <div id="main-account-wrap-master" className="main-account-wrap--listing">
      <div className="container w-100">
        <div className="d-flex align-items-center justify-content-space-between mb-24">
          <div className="text-headline">
            Campers
          </div>
          <MainBtnGradient text="List another camper" />
        </div>
        <div className="master-view-wrap">
          <Filters />
          <div>
            <div className="master-view-card-table-header">
              <div className="mr-auto">
                Camper
              </div>
              <div className="master-view-card__id">
                ID
              </div>
              <div className="master-view-card__status">
                Status
              </div>
              <div className="master-view-card__insurance">
                Insurance
              </div>
              <div className="master-view-card__options" />
            </div>
            <CamperCard
              status={<Tag color="success" className="mr-0 ml-0">Published</Tag>}
              withInsurance
            />
            <CamperCard
              status={<Tag color="processing" className="mr-0 ml-0">Unpublished</Tag>}
            />
            <CamperCard
              status={<Tag color="warning" className="mr-0 ml-0">On moderation</Tag>}
              withInsurance
            />
            <CamperCard
              status={<Tag color="default" className="mr-0 ml-0">Draft</Tag>}
              withInsurance
            />
            <CamperCard
              status={<Tag color="error" className="mr-0 ml-0">Deactivated</Tag>}
            />
          </div>
          <div className="d-flex justify-content-flex-end">
            <Pagination defaultCurrent={15} total={24} />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ExploreMyListing;
