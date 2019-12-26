import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './Navigation.css'

class Navigation extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" className="sticky-top">
        {/* Same as above  */}
        {/* <Navbar className="bg-primary navbar-dark sticky-top"> */}
        <Navbar.Brand href="/">ReactApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ml-auto">

            {/* <Nav.Link href="/">Home</Nav.Link> */}
            
            {/* <Nav.Link href="/sample">Sample</Nav.Link> */}
            <Link to="/sample" className="nav-link">Sample1</Link>

            <NavDropdown title="Serverless Tutorial" id="basic-nav-dropdown">
              <NavDropdown.Item href="/serverless-stack/login">Login CustomUI</NavDropdown.Item>
              <NavDropdown.Divider />              
            </NavDropdown>


            <NavDropdown title="AWS Examples" id="basic-nav-dropdown">
              <NavDropdown.Item href="/aws/s3">S3 Photo Album</NavDropdown.Item>
              <NavDropdown.Item href="/aws/dynamodb">DynamoDB</NavDropdown.Item>
              <NavDropdown.Item href="/aws/api">ApiGateway</NavDropdown.Item>
              <NavDropdown.Divider />              
              <NavDropdown.Item href="/aws/login-userpool-hosted">Login UserPool HostedUI</NavDropdown.Item>
              {/* <NavDropdown.Item href="/aws/login-identitypool">Login IdentityPool</NavDropdown.Item> */}
              <NavDropdown.Item href="/aws/login-identitypool-google">Login Using Goole</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Worpress API Examples" id="basic-nav-dropdown">
              <NavDropdown.Item href="/posts">Posts</NavDropdown.Item>
              <NavDropdown.Item href="/create-post">Create Post</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/pages">Pages</NavDropdown.Item>
            </NavDropdown>

            {/* Change if refresh is not required  */}
            <NavDropdown title="Styling" id="basic-nav-dropdown">
              <NavDropdown.Item href="/examples/styling">FontAwesome</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/examples/styled-component">Styled Component</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/examples/material-ui">Material UI</NavDropdown.Item>
              <NavDropdown.Item href="/examples/material-ui-drawer">Material UI Drawer</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/examples/bootstrap-tabs">Bootstrap Tabs</NavDropdown.Item>
            </NavDropdown>


          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-1" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation;
