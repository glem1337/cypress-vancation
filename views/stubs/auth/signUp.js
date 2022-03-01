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
import PhoneDropdown from '../shared/dropdowns/PhoneDropdown';
import Logo from '../shared/Logo';

const SignUp = () => (
  <div className="main-wrap">
    <AuthLeftSidebar />
    <div className="auth-main">
      <div className="auth-main__container">
        <Row justify="center">
          <Col md={23} lg={24}>
            <div className="auth-main__header">
              <Logo bigLogoClassName="d-lg-none" />
              <p className="mr-8 ml-auto">
                Already have an account?
              </p>
              <Button type="secondary" size="small">
                Log in
              </Button>
            </div>
          </Col>
          <Col md={23} lg={16}>
            <div>
              <h1 className="main-title">
                Sign Up
              </h1>
              <p className="mb-24 mb-md-40">
                Search, discover and book your favorite campervans and unique RVs.
              </p>
              <Alert
                type="error"
                message="Please fill in the fields to continue"
                showIcon
                icon={<i className="icon icon-info" />}
              />
              <form action="">
                <Row gutter={24}>
                  <Col md={12}>
                    <div>
                      <label className="main-input__label" htmlFor="name">
                        First name
                      </label>
                      <Input type="text" placeholder="Cory" id="name" />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div>
                      <label className="main-input__label" htmlFor="Lastname">
                        Last name
                      </label>
                      <Input type="text" placeholder="Hubbard" id="Lastname" />
                    </div>
                  </Col>
                  <Col span={24}>
                    {/*
                    When input has message add classes
                     to wrapper "main-input--has-message mb-16"
                     instead, remove it
                    */}
                    <div className="main-input--has-message mb-16">
                      <label className="main-input__label" htmlFor="email">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="cory.hubbard@gmail.com"
                        id="email"
                        className="mb-0"
                      />
                      <p className="main-input__message">
                        <i className="main-input__message-icon icon icon-alert in-red-1000" />
                        Email has a wrong format
                      </p>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="d-flex align-items-center">
                      <PhoneDropdown />
                      <Input
                        placeholder="1234567890"
                        className="w-100 main-input__field--no-label"
                      />
                    </div>
                  </Col>
                  <Col span={24}>
                    <PasswordInput
                      iconInfo
                      labelText="Password"
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
                        Create account
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
        <div className="mt-auto text-align-center">
          <p>
            By signing up, I agree to
            {' '}
            <a href="" className="main-link">
              Vancation Terms of Service
            </a>
            {' '}
            and
            {' '}
            <a href="" className="main-link">
              Privacy Policy.
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default SignUp;
