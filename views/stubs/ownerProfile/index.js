import {
  Row, Col, Tabs, Alert,
} from 'antd';
import Header from 'views/stubs/layout/headers/mainHeader/Header';
import { Footer } from '../layout/Footer';
import ProfileUserCard from '../renterProfile/components/ProfileUserCard';
import { CommentTab } from './components/CommentTab';
import CamperCard from './components/CamperCard';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';

const { TabPane } = Tabs;

const OwnerProfile = () => (
  <>
    <Header />
    <div className="profile-wrap">
      <div className="container">
        <Row gutter={24}>
          <Col lg={6}>
            <ProfileUserCard
              userName="Stephen Buchanan"
              btnTxt="Edit business profile"
              txtTitle="Hi, I am Stephen Buchanan"
            />
          </Col>
          <Col lg={18}>
            <Alert
              message="We highly recommend verifying your Driver’s License to provide more trust to potential renters."
              className="align-items-center mb-24 alert--big"
              type="info"
              action={(
                <MainBtnGradient
                  size="small"
                  text=" Verify my License"
                />
              )}
              showIcon
              icon={<i className="icon icon-info" />}
            />
            <Tabs defaultActiveKey="1">
              <TabPane tab="Campers (2)" key="1">
                <Row gutter={24}>
                  <CamperCard />
                  <CamperCard isGlamper />
                </Row>
                {/* if empty <EmptyBlock /> */}
              </TabPane>
              <TabPane tab="Reviews (2)" key="2">
                <CommentTab />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </div>
    <Footer />
  </>
);

export default OwnerProfile;
