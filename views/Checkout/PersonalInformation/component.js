import CheckoutLayout from 'views/layouts/CheckoutLayout';
import Header from 'views/Checkout/Header';

import useContainer, { getInitialProps } from './hook';

const PersonalInformation = () => {
  useContainer();

  return (
    <CheckoutLayout
      price={375}
      currentStep={0}
      btnText={{ id: 'shared.agreeAndContinue' }}
      header={<Header currentStep={0} />}
    >
      Foo
    </CheckoutLayout>
  );
};

PersonalInformation.getInitialProps = getInitialProps;

export default PersonalInformation;
