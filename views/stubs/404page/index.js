import { Space } from 'antd';
import Header from '../layout/headers/mainHeader/Header';
import { Footer } from '../layout/Footer';

const Page = () => (
  <>
    <Header unlogged />
    <div className="not-found__container">
      <div className="not-found__img">
        <img src="/images/404.svg" alt="" />
      </div>
      <div className="not-found__txt">
        <h1 className="text-headline-display mb-24">
          We can&apos;t seem to find the page you&apos;re looking for.
        </h1>
        <p className="text-subheader text-color-gray font-400 mb-12">
          Here are some helpful links instead:
        </p>
        <Space className="w-100" direction="vertical" size={8}>
          <a className="main-link--big" href="#">
            Homepage
          </a>
          <a className="main-link--big" href="#">
            Search Campervans &#38; RV Rentals
          </a>
          <a className="main-link--big" href="#">
            List your Camper
          </a>
          <a className="main-link--big" href="#">
            Checkout Popular Destinations
          </a>
        </Space>
      </div>
    </div>
    <Footer />
  </>
);

export default Page;
