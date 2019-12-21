import React, { Component } from "react";
import AWS from 'aws-sdk'
import {
  Button, Form, Col, Row,
  Tabs, Tab
} from 'react-bootstrap'

import conf from '../conf'
import LogMessage from './LogMessage'



class DynamoDB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
    };    
  }

  componentDidMount() {    
  }

  render() {
    return (
      <div className="container" >

        <h1 style={{ textTransform: "uppercase", color: "green" }}>{conf.str.title.lambda}</h1>
        <hr />

        <LogMessage title="Lamda Log" />

      </div>
    );
  }
}

export default DynamoDB;