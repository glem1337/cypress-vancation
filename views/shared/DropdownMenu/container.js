import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { RemoveScroll } from 'react-remove-scroll';

import Dropdown from 'views/shared/Dropdown';

class DropdownMenu extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node).isRequired,
      PropTypes.node,
    ]).isRequired,
    menuClassName: PropTypes.string,
  }

  static defaultProps = {
    menuClassName: null,
  }

  state = {
    visible: false,
  }

  handleVisibleChange = visible => this.setState({ visible })

  handleClose = onClick => (event) => {
    onClick(event);
    this.setState({ visible: false });
  }

  stopPropagation = e => e.stopPropagation()

  render() {
    const { children, menuClassName, ...restProps } = this.props;
    const { visible } = this.state;

    return (
      <span role="button" onClick={this.stopPropagation}>
        <Dropdown
          onVisibleChange={this.handleVisibleChange}
          visible={visible}
          {...restProps}
        >
          <Menu className={menuClassName}>
            <RemoveScroll enabled={visible}>
              {React.Children.map(children, child => (
                React.cloneElement(child, {
                  onClick: this.handleClose(child.props.onClick),
                })
              ))}
            </RemoveScroll>
          </Menu>
        </Dropdown>
      </span>
    );
  }
}

export default DropdownMenu;
