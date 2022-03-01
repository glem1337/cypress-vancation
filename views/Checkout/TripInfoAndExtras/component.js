import CheckoutLayout from 'views/layouts/CheckoutLayout';
import Header from 'views/Checkout/Header';

import useContainer, { getInitialProps } from './hook';

const TripInfoAndExtras = () => {
  const { onBack } = useContainer();

  return (
    <CheckoutLayout
      onBack={onBack}
      showBackBtn
      price={375}
      currentStep={1}
      btnText={{ id: 'shared.continue' }}
      header={<Header currentStep={1} />}
    >
      Foo
    </CheckoutLayout>
  );
};

TripInfoAndExtras.getInitialProps = getInitialProps;

export default TripInfoAndExtras;
