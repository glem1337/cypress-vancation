import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import AccountTab from './AccountTab';

class AccountTabs extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    activeTab: this.props.children[0].props.label,
  };

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      },
    } = this;

    return (
      <div className="container">
        <Row>
          <Col lg={6}>
            <div className="main-account__tabs">
              {children.map((child) => {
                const { label } = child.props;
                const { iconClass } = child.props;

                return (
                  <AccountTab
                    activeTab={activeTab}
                    key={label}
                    label={label}
                    iconClass={iconClass}
                    onClick={onClickTabItem}
                  />
                );
              })}
            </div>
          </Col>
          <Col lg={18}>
            <div className="main-account__inner">
              {children.map(
                child => ((child.props.label !== activeTab) ? undefined : child.props.children),
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AccountTabs;
