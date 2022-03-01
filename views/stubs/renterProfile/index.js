import {
  Row, Col, Tabs,
} from 'antd';
import Header from 'views/stubs/layout/headers/mainHeader/Header';
import { Footer } from '../layout/Footer';
import ProfileUserCard from './components/ProfileUserCard';

const { TabPane } = Tabs;

const RenterProfile = () => (
  <>
    <Header />
    <div className="profile-wrap">
      <div className="container">
        <Row gutter={24}>
          <Col lg={6}>
            <ProfileUserCard
              userName="Rodney Harmon"
              userTxt="Member since November 2020"
              btnTxt="Edit profile"
            />
          </Col>
          <Col lg={18}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Trips (0)" key="1">
                {/* if empty <EmptyBlock /> */}
              </TabPane>
              <TabPane tab="Favorites (0)" key="2">
                Content of Tab Pane 2
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </div>
    <Footer />
  </>
);

export default RenterProfile;
