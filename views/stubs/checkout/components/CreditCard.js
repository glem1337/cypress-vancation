/* eslint-disable react/prop-types */
import { Form, Input } from 'antd';
import classNames from 'classnames';

const CreditCard = ({ className }) => (
  <div className={classNames('checkout__credit-card', className)}>
    <div className="checkout__credit-card-head">Credit card</div>
    <div className="checkout__credit-card-body">
      <div className="checkout__credit-card-inputs">
        <Form.Item
          className="mb-0"
          label={<span className="main-input__label">Card number</span>}
        >
          <Input
            className="pr-32"
            prefix={<i className="icon icon-card" />}
            placeholder="**** **** **** ****"
          />
          {/* Add when input is filled with mastercard card, for other cards use the
          corresponding images */}
          {/* <span className="main-input__add-txt">
            <img className="w-20" src="/images/Mastercard.svg" alt="" />
          </span> */}
        </Form.Item>
        <Form.Item
          className="mb-0"
          label={<span className="main-input__label">Expiration date</span>}
        >
          <Input placeholder="MM/YY" />
        </Form.Item>
        <Form.Item
          className="mb-0"
          label={<span className="main-input__label">CVV</span>}
        >
          <Input placeholder="***" />
        </Form.Item>
      </div>
    </div>
  </div>
);

export default CreditCard;
