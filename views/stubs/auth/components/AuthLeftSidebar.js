const AuthLeftSidebar = () => (
  <div className="auth-left">
    <div className="auth-left__logo">
      <img src="/images/logo/logo-white.svg" alt="" />
    </div>
    <div className="auth-left__txt-wrap">
      <div className="auth-left-title">
        Where the Journey Begins
      </div>
      <p className="auth-left-txt">
        Start your adventure with the safest campervan rental network in existence.
        You’re protected with industry leading insurance, free roadside
        assistance and 24/7 customer support.
      </p>
    </div>
    <div className="mt-auto">
      <p className="auth-left__bottom-txt">
        Currently Accepting Followers
      </p>
      <div className="auth-left__bottom-icon-wrap">
        <a href="" className="mr-12 ml-12">
          <i className="icon icon-facebook" />
        </a>
        <a href="" className="mr-12 ml-12">
          <i className="icon icon-instagram" />
        </a>
        <a href="" className="mr-12 ml-12">
          <i className="icon icon-pinterest" />
        </a>
      </div>
    </div>
  </div>
);

export default AuthLeftSidebar;
