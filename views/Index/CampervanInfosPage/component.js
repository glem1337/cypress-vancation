import HeaderUser from 'views/shared/UserHeader';
import UserFooter from 'views/shared/UserFooter';

const CampervanRentalsPage = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <HeaderUser />
    <div
      style={{
        display: 'flex',
        flex: 1,
        padding: '20px',
      }}
    >
      Campervan Rentals Page
    </div>
    <UserFooter />
  </div>
);

export default CampervanRentalsPage;
