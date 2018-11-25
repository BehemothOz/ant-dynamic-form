import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const Navigation = (props) => {
  const defaultKeys = props.location.pathname;
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[ `${defaultKeys}` ]}
    >
      <Menu.Item key="/"><Link to="/">Main Page</Link></Menu.Item>
      <Menu.Item key="/form"><Link to="/form">Form Page</Link></Menu.Item>
    </Menu>
  );
};

export default withRouter(Navigation);