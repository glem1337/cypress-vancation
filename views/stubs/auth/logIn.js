import {
  Row,
  Col,
  Alert,
  Input,
  Button,
  Divider,
} from 'antd';
import PasswordInput from '../shared/inputs/textfield/PasswordInput';
import AuthLeftSidebar from './components/AuthLeftSidebar';
import Logo from '../shared/Logo';

const LogIn = () => (
  <div className="main-wrap auth--login">
    <AuthLeftSidebar />
    <div className="auth-main">
      <div className="auth-main__container">
        <Row justify="center">
          <Col md={22} lg={24}>
            <div className="auth-main__header">
              <Logo bigLogoClassName="d-lg-none" />
              <p className="mr-8 ml-auto">
                Don’t have an account yet?
              </p>
              <Button type="secondary" size="small">
                Sign up
              </Button>
            </div>
          </Col>
          <Col md={22} lg={16}>
            <div>
              <h1 className="main-title">
                Welcome back!
              </h1>
              <p className="mb-24 mb-md-40">
                It’s time for another road trip.
              </p>
              <Alert
                type="error"
                message="Please fill in the fields to continue"
                showIcon
                icon={<i className="icon icon-info" />}
              />
              <Alert
                type="success"
                message="Your password has been updated"
                showIcon
                icon={<i className="icon icon-checked" />}
                closable
              />
              <form action="">
                <Row gutter={24}>
                  <Col span={24}>
                    <div>
                      <label className="main-input__label" htmlFor="email">
                        Email
                      </label>
                      <Input type="email" placeholder="cory.hubbard@gmail.com" id="email" />
                    </div>
                  </Col>
                  <Col span={24}>
                    <PasswordInput
                      iconInfo
                      labelText="Password"
                      forgotPass
                      message="Use a minimum password length of 6 or more characters"
                    />
                  </Col>
                  <Col span={24}>
                    <div className="auth-main__btn-wrap">
                      {/* replace Button for MainBtnGradient  when form is filled */}
                      <Button
                        size="large"
                        className="min-w-180 main-btn--sm-100"
                      >
                        Log in
                      </Button>
                    </div>
                  </Col>
                </Row>
              </form>
              <div className="mb-24">
                <Row gutter={24}>
                  <Col span={24}>
                    <Divider
                      className="mt-0"
                      plain
                    >
                      Or
                    </Divider>
                  </Col>
                  <Col md={12}>
                    <div className="auth-main-social-btn">
                      <img className="mr-12" src="/images/Google.svg" alt="" />
                      Continue with Google
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="auth-main-social-btn">
                      <img className="mr-12" src="/images/Facebook.svg" alt="" />
                      Continue with Facebook
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
);

export default LogIn;
