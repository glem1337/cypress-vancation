import { Row, Col, Input, Button } from 'antd';
import BackBtn from '../shared/buttons/BackBtn';
import Logo from '../shared/Logo';

const ResetPassword = () => (
  <div className="main-wrap">
    <div className="auth-main justify-content-flex-start flex-column">
      <Row justify="center">
        <Col md={23} lg={24}>
          <div className="auth-main__header-reset">
            <Logo />
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col md={23} lg={12}>
          <div className="text-align-center">
            <h1 className="main-title">
              Reset your password
            </h1>
            <p className="mb-24 mb-md-40">
              Please enter the email address you used when creating
              your account and we will send you a password recovery link.
            </p>
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col md={14} lg={8}>
          <form>
            <div>
              <label className="main-input__label" htmlFor="email">
                Email
              </label>
              <Input type="email" placeholder="cory.hubbard@gmail.com" id="email" />
            </div>
            <div className="d-flex align-items-center justify-content-space-between">
              <BackBtn text="Back to Log in" />
              {/* replace Button for MainBtnGradient  when form is filled */}
              <Button
                size="large"
                className="min-w-160"
              >
                Send recovery link
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  </div>
);

export default ResetPassword;
