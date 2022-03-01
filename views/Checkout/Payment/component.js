import CheckoutLayout from 'views/layouts/CheckoutLayout';
import Header from 'views/Checkout/Header';

import useContainer, { getInitialProps } from './hook';

const Payment = () => {
  const { onBack } = useContainer();

  return (
    <CheckoutLayout
      onBack={onBack}
      showBackBtn
      price={375}
      currentStep={3}
      btnText={{ id: 'shared.requestBooking' }}
      header={<Header currentStep={3} />}
    >
      Foo
    </CheckoutLayout>
  );
};

Payment.getInitialProps = getInitialProps;

export default Payment;
