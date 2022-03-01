import { FundProjectionScreenOutlined } from '@ant-design/icons';
import { Row } from 'antd';
import Link from 'next/link';

const GuestHeader = () => (
  <header>
    <Row justify="center">
      <Link href="/">
        <a>
          <FundProjectionScreenOutlined style={{ fontSize: '36px' }} />
        </a>
      </Link>
    </Row>
  </header>
);

export default GuestHeader;
