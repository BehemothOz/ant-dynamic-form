import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

import 'antd/dist/antd.css';

import Navigation from './Components/Navigation';
import MainPage from './Pages/MainPage'
import FormPage from './Pages/FormPage';

const { Header, Content } = Layout;

class App extends Component {
  render() {
    // console.log(this.props)
    return (
        <Layout>
          <Header style={{ height: '46px' }}>
            <Navigation {...this.props} />
          </Header>

          <Content>
            <Route exact path="/" component={MainPage} />
            <Route path="/form" component={FormPage} />
          </Content>
        </Layout>
    );
  }
}

export default App;
