import React from 'react';

/**
 * Use Switch | Route in react-router-dom not in react-router
 */
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import { Switch, Redirect,  Route } from 'react-router';

import Navigation from './components/Navigation';
import Home from './pages/Home'
import Sample from './pages/Sample'

import CreatePost from './pages/examples-wp-api/Create-post'
import PostList from './pages/examples-wp-api/postList'
import PostView from './pages/examples-wp-api/PostView'

import Styling from './pages/examples-style/Example-fontAwesome'
import StyledComponent from './pages/examples-style/Example-styledComponent'
import MaterialUI from './pages/examples-style/Example-materialUI'
import MaterialUIDrawer from './pages/examples-style/Example-materialUI-drawer'
import BootstrapTabs from './pages/examples-style/Example-bootstrap-tabs'
import NotFound from './components/NotFound'

import S3 from './pages/examples-aws/S3'
import Dynamodb from './pages/examples-aws/Dynamodb'
import Api from './pages/examples-aws/ApiGateway'

import Login from './pages/examples-aws/Login'
import LoginUserPoolHostedUI from './pages/examples-aws/Login-OAuth-userPool-hostedUI'
import LoginIdentityPool from './pages/examples-aws/Login-OAuth-identityPool-federated'
import LoginIdentityPoolGoogle from './pages/examples-aws/Login-identityPool-federated-google'

function Footer(props) {
  let footerContainer = {    
    marginTop: '30px',
    backgroundColor: "#343a40", 
    textAlign: "center", 
    color: 'white',
  }
  return (
    <div className="container-fluid" style={footerContainer}>
      <p style={{margin: "0", padding: "50px" }}>This is Footer area</p>
    </div>
  )
}

class App extends React.Component {  
  render() {
    return (

      <BrowserRouter>
        {/* <div style={zeroMargin}> */}
        <Navigation />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/sample' component={Sample} />

          {/* Server-stack.com Tutorial */}
          <Route exact path='/serverless-stack/login' component={Login} />

          {/* AWS Examples */}
          <Route path='/aws/s3' component={S3} />
          <Route path='/aws/dynamodb' component={Dynamodb} />
          <Route path='/aws/api' component={Api} />
          <Route exact path='/aws/login-userpool-hosted' component={LoginUserPoolHostedUI} />
          <Route exact path='/aws/login-identitypool' component={LoginIdentityPool} />
          <Route exact path='/aws/login-identitypool-google' component={LoginIdentityPoolGoogle} />

          {/* Wordpress Api Examples */}
          <Route
            exact path="/pages"
            render={(props) => <PostList {...props} contentType="pages" />}
          />
          <Route
            path="/pages/:name"
            render={(props) => <PostView {...props} contentType="pages" />}
          />

          <Route exact path='/create-post' component={CreatePost} />

          <Route
            exact path="/posts"
            render={(props) => <PostList {...props} contentType="posts" />}
          />
          <Route
            path="/posts/:name"
            render={(props) => <PostView {...props} contentType="posts" />}
          />

          {/* Styling Examples */}
          <Route path='/examples/styling' component={Styling} />
          <Route path="/examples/styled-component" component={StyledComponent} />
          <Route path="/examples/material-ui" component={MaterialUI} />
          <Route path="/examples/material-ui-drawer" component={MaterialUIDrawer} />

          <Route path="/examples/bootstrap-tabs" component={BootstrapTabs} />

          <Route component={NotFound} />
        </Switch>

        <Footer />

      </BrowserRouter>
    )
  }
}

export default App;
