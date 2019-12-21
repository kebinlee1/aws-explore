import React from 'react'
// import Tab from '@bit/react-bootstrap.react-bootstrap.tab'
// import Tabs from '@bit/react-bootstrap.react-bootstrap.tabs'
// import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';

import {
  // Button, Form, Col, Row,
  Tabs, Tab
} from 'react-bootstrap'


function TabContents(props) {
  let key = props.eventKey
  if (key === "home") {
    return (
      <h5>This is Home</h5>
    )
  } else if (key === "profile") {
    return (
      <h5>This is Profile</h5>
    )
  } else if (key === "contact") {
    return (
      <h5>This is Contact</h5>
    )
  }
}

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'home',
    };
  }

  render() {
    let style = {
      backgroundColor: 'yellow'
    }
    return (
      <div className="container">
        <h1>Tabs Example</h1>
        <hr />

        <Tabs
          style={style}
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="home" title="Home">
            <br />
            <TabContents eventKey="home" /></Tab>
          <Tab eventKey="profile" title="Profile">
            <br />
            Profile content</Tab>
          <Tab eventKey="contact" title="Contact">
            <br />
            Contact content</Tab>
        </Tabs>
      </div>
    )
  }
}

export default Example
// export default () => (<div><ReactBootstrapStyle /><Example /></div>)