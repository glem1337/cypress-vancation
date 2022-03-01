import Header from 'views/stubs/layout/headers/mainHeader/Header';
import EmptyBlock from './components/EmptyBlock';

const EmptyPage = () => (
  <>
    <Header />
    <div className="main-account-wrap--listing">
      <div className="container w-100 d-flex flex-column">
        <div className="text-headline mb-24">
          Campers
        </div>
        <EmptyBlock />
      </div>
    </div>
  </>
);

export default EmptyPage;
