import CheckoutLayout from 'views/layouts/CheckoutLayout';
import Header from 'views/Checkout/Header';

import useContainer, { getInitialProps } from './hook';

const ProtectionPlan = () => {
  const { onBack } = useContainer();

  return (
    <CheckoutLayout
      onBack={onBack}
      showBackBtn
      price={375}
      currentStep={2}
      btnText={{ id: 'shared.continue' }}
      header={<Header currentStep={2} />}
    >
      Foo
    </CheckoutLayout>
  );
};

ProtectionPlan.getInitialProps = getInitialProps;

export default ProtectionPlan;
