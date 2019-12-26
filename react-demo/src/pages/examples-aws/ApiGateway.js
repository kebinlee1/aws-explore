import React, { Component } from "react";
// import AWS from 'aws-sdk'
// import {
//   Button, Form, Col, Row,
//   Tabs, Tab
// } from 'react-bootstrap'
import axios from 'axios'
import conf from '../conf'
import LogMessage from './LogMessage'
import { Button } from "react-bootstrap";

import './style.aws.explore.css'

function MocIntegration(props) {
  let url = conf.awsConfig.ApiGateway.testApis[2].url + '?myParam=myValue'
  return (
    <div>
      <h2>Moc Integration 예제</h2>
      <p style={{ fontWeight: "600" }}>
        <code>my-api/prod/moc-integration</code>
      </p>
      <Button
        url-src={url}
        variant="info"
        style={{ width: "100%" }}
        onClick={props.onClick}
      >
        Api Gateway Moc Integration: {url}
      </Button>

    </div>
  )
}

function LambdaProxyIntegration(props) {
  let helloworldUrl = conf.awsConfig.ApiGateway.testApis[1].url + '?name=Kebin&city=Seoul'
  return (
    <div>
      <h2>Lambda 프록시통합 </h2>
      <p style={{ fontWeight: "600" }}><code>my-api/test/hellowowld</code></p>
      <p style={{ fontWeight: "600" }}>람다 프록시 통합임. 람다함수 event 객체인 input객체를 볼 것...</p>
      <Button
        url-src={helloworldUrl}
        variant="warning"
        style={{ width: "100%" }}
        onClick={props.onClick}
      >
        Api Gateway Test: {helloworldUrl}
      </Button>
    </div>
  )
}

function ApiGatewayGetStarted(props) {
  let rootUrl = conf.awsConfig.ApiGateway.testApis[0].url
  let helloLambda2Url = conf.awsConfig.ApiGateway.testApis[0].url + '/hello-lambda2?myParam=KEBINLEE'
  return (
    <div>

      <h2>Lambda 통합 Api Gateway 생성 예제</h2>

      <p style={{ fontWeight: "600" }}>
        <code>my-api/prod</code> 는 람다 프록시 통합, <code>my-api/prod/hello-lambda2</code> 는 람다 프록시 비 통합임.
      </p>
      <Button
        url-src={rootUrl}
        variant="success"
        style={{ width: "100%" }}
        onClick={props.onClick}
      >
        Api Gateway Test: {conf.awsConfig.ApiGateway.testApis[0].url}
      </Button>

      <br /><br />

      <Button
        url-src={helloLambda2Url}
        variant="info"
        style={{ width: "100%" }}
        onClick={props.onClick}
      >
        Api Gateway Test: {helloLambda2Url}
      </Button>

    </div>
  )
}

class ApiGateway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
    };

    this.handleApiGatewayTest = this.handleApiGatewayTest.bind(this)
  }

  componentDidMount() {
  }

  handleApiGatewayTest(e) {

    console.log(e.target.getAttribute("url-src"))

    axios
      .get(e.target.getAttribute("url-src"),
        {
          crossdomain: true
        })
      .then(d => {
        console.log('data', d)
        this.setState({
          msg: JSON.stringify(d.data)
        });
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.headers);
        }
        else if (error.request) {
          console.log('error.request: ', error.request);
        }
        else {
          console.log('error.message: ', error.message);
        }
        console.log('error.config: ', error.config);
      })

  }

  render() {

    return (
      <div className="container" >

        <h1 style={{ textTransform: "uppercase", color: "green" }}>Api-Gateway + Lambda Example</h1>
        <hr />

        <LogMessage title="API Gateway Log" msg={this.state.msg} />

        <hr />
        <ApiGatewayGetStarted onClick={this.handleApiGatewayTest} />

        <hr />
        <LambdaProxyIntegration onClick={this.handleApiGatewayTest} />

        <hr />
        <MocIntegration onClick={this.handleApiGatewayTest} />

      </div>
    );
  }
}

export default ApiGateway;