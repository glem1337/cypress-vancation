import { Row, Col, Button } from 'antd';
import BackBtn from '../shared/buttons/BackBtn';
import PasswordInput from '../shared/inputs/textfield/PasswordInput';
import Logo from '../shared/Logo';

const CreateNewPassword = () => (
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
              Create new password
            </h1>
            <p className="mb-24 mb-md-40">
              You need to set a new password for your account.
            </p>
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col md={14} lg={8}>
          <form>
            <PasswordInput
              isPassw
              labelText="Password"
              message="Use a minimum password length of 6 or more characters"
              iconInfo
              scaleStep
              className="mb-24"
            />
            <div className="d-flex align-items-center justify-content-space-between">
              <BackBtn text="Back to Log in" />
              {/* replace Button for MainBtnGradient  when form is filled */}
              <Button
                size="large"
                className="min-w-140"
              >
                Submit
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  </div>
);

export default CreateNewPassword;
