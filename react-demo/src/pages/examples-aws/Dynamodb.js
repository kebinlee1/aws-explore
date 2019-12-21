import React, { Component } from "react";
import AWS from 'aws-sdk'
// import Cognito from 'amazon-cognito-identity-js'
import {
  Button, Form, Col, Row,
  // Tabs, Tab
} from 'react-bootstrap'

import conf from '../conf'
import LogMessage from './LogMessage'

import './dynamodb.css'

function CreateTableButton(props) {
  return (
    <Button variant="info" style={{ width: "100%" }}
    // onClick={props.onClick} // already done
    >
      Table Movies and Movies2 Created</Button>
  )
}

function InputFile(props) {
  return (
    <Form.Group
      // as={Col} 
      md="4" controlId="validationCustom01">
      <Form.Label>Select Movie data File</Form.Label>
      <Form.Control
        required
        type="file"
      // onChange={props.onChange} // already done
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>
  )
}

function GetItem(props) {

  //
  // ref: https://react-bootstrap.github.io/components/forms/
  //
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridTable">
          <Form.Label>Table Name</Form.Label>
          <Form.Control name="tablename" type="text" placeholder="Movies" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridYear">
          <Form.Label>Year</Form.Label>
          <Form.Control name="year" type="text" placeholder="Year" />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridTitle">
        <Form.Label>Movie Title</Form.Label>
        <Form.Control name="title" type="text" placeholder="Movie Title here" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit</Button>
    </Form>
  )
}

function QueryData(props) {
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="4">Year to Query</Form.Label>
        <Col sm="8">
          <Form.Control name="yearToQuery" placeholder="Year" />
        </Col>
      </Form.Group>

      <Button variant="warning" type="submit">
        Submit</Button>
    </Form>
  )
}

class DynamoDB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
    };
    this.count = 0
    this.dynamodb = null
    this.queryYear = 1944

    this.createTable = this.createTable.bind(this)
    this.processFile = this.processFile.bind(this)
    this.readItem = this.readItem.bind(this)
    this.query = this.query.bind(this)
    this.listTables = this.listTables.bind(this)
  }

  componentDidMount() {
    AWS.config.update({
      region: conf.awsConfig.region,
      // endpoint: 'http://localhost:3000/aws/dynamodb', // MUST be removed
      // accessKeyId default can be used while using the downloadable version of DynamoDB. 
      // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
      accessKeyId: conf.awsConfig.accessKeyId,
      // secretAccessKey default can be used while using the downloadable version of DynamoDB. 
      // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
      secretAccessKey: conf.awsConfig.secretAccessKey
    });

    setTimeout(() => {
      this.listTables()
    }, 1000)
  }

  listTables() {
    let that = this
    let dynamodb = new AWS.DynamoDB();

    dynamodb.listTables({}, function (err, data) {
      let msg = ''
      if (err) {
        msg = "Unable to listtables: "  + JSON.stringify(err, undefined, 2)
      } else {
        msg = "Existing Tables: "  + JSON.stringify(data, undefined, 2)
      }

      that.setState({ msg: msg })
    });

  }

  createTable() {
    let that = this

    var params = {
      TableName: "Movies2",
      KeySchema: [
        { AttributeName: "year", KeyType: "HASH" },
        { AttributeName: "title", KeyType: "RANGE" }
      ],
      AttributeDefinitions: [
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    };

    let dynamodb = new AWS.DynamoDB();

    dynamodb.createTable(params, function (err, data) {
      let msg = ''
      if (err) {
        msg = "Unable to create table: "  + JSON.stringify(err, undefined, 2)
      } else {
        msg = "Created table: "  + JSON.stringify(data, undefined, 2)
      }

      that.setState({
        msg: msg
      })

    });
  }

  processFile(evt) {

    let that = this

    let docClient = new AWS.DynamoDB.DocumentClient()

    var file = evt.target.files[0]
    if (file) {
      let r = new FileReader()

      r.onload = function (e) {
        var contents = e.target.result;
        var allMovies = JSON.parse(contents);

        console.log(allMovies.length)

        allMovies.forEach(function (movie) {
          let msg = ''
          msg += movie.title + " | ";


          var params = {
            TableName: "Movies",
            Item: {
              "year": movie.year,
              "title": movie.title,
              "info": movie.info
            }
          };

          docClient.put(params, function (err, data) {
            if (err) {
              // document.getElementById('textarea').innerHTML += "Unable to add movie: " + count + movie.title ;
              // document.getElementById('textarea').innerHTML += "Error JSON: " + JSON.stringify(err) ;
              msg += "Unable to add movie: " + movie.title + " | "
              msg += "Error JSON: " + JSON.stringify(err) + " | "
              addMsg(msg)
            } else {
              // document.getElementById('textarea').innerHTML += "PutItem succeeded: " + movie.title ;
              // textarea.scrollTop = textarea.scrollHeight;
              msg += "PutItem succeeded: " + movie.title + " | "
              addMsg(msg)
            }
          });
        });
      };
      r.readAsText(file);

    } else {
      alert("Could not read movie data file");
    }

    function addMsg(msg) {
      that.setState({
        msg: msg
      })

    }

  }

  readItem(e) {
    e.preventDefault()

    let that = this
    var docClient = new AWS.DynamoDB.DocumentClient();

    console.log(e.target.tablename.value, e.target.year.value, e.target.title.value)

    var table = "Movies"
    var year = this.queryYear;
    var title = "Lifeboat";

    var params = {
      TableName: table,
      Key: {
        "year": year,
        "title": title
      }
    };
    docClient.get(params, function (err, data) {
      if (err) {
        // document.getElementById('textarea').innerHTML = "Unable to read item: "  + JSON.stringify(err, undefined, 2);
        that.setState({
          msg: "Unable to read item: "  + JSON.stringify(err, undefined, 2)
        })

      } else {
        that.setState({
          msg: "GetItem succeeded: "  + JSON.stringify(data, undefined, 2),
          imgUrl: data.Item.info.image_url
        })
        console.log(data.Item.info.image_url)

      }
    });
  }

  query(e) {
    e.preventDefault()
    console.log(e.target.yearToQuery.value)

    let that = this
    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
      TableName: "Movies",
      KeyConditionExpression: "#yr = :yyyy",
      ExpressionAttributeNames: {
        "#yr": "year"
      },
      ExpressionAttributeValues: {
        ":yyyy": this.queryYear
      }
    };

    docClient.query(params, function (err, data) {
      if (err) {
        that.setState({ msg: "Unable to query. Error: "  + JSON.stringify(err, undefined, 2) })

      } else {
        that.setState({
          msg: `Querying for movies from ${that.queryYear}, ${data.Items.length} movies `  + JSON.stringify(data, undefined, 2)
        })
      }
    });

  }

  render() {
    return (
      <div className="container" >

        <h1 style={{ textTransform: "uppercase", color: "green" }}>{conf.str.title.dynamodb}</h1>
        <h4>Installing amazon-cognito-identity-js failed in ERROR, then IAM user used for the authentication.</h4>

        <hr />

        {/* <div className="log">          
          <p style={{ color: 'green', fontWeight: 'bold' }}>Messages:</p>
          <p>{this.state.msg}</p>
        </div> */}

        <LogMessage title="Log Message" msg={this.state.msg} />


        <hr />

        <h2>Query Data</h2>
        <p>Just Click, then get query data of "{this.queryYear}" as hardcoded for example.</p>
        <QueryData onSubmit={this.query} />

        <hr />

        <h2>Get Item</h2>
        <p>Just Click, then get an item of "1944, Lifeboat" as hardcoded for example.</p>
        <GetItem onSubmit={this.readItem} />

        <hr />

        <h2>Table Creation</h2>
        <CreateTableButton onClick={this.createTable} />

        <hr />

        <h2>Movie Data Upload</h2>
        <h5 style={{ color: 'orange' }}>Data uploaded using aws-dynamodb/moviedata/moviedata.json</h5>
        <InputFile onChange={this.processFile} />

      </div>
    );
  }
}

export default DynamoDB;