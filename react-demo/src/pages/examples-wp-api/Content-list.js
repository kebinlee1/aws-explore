import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  // CardGroup, CardDeck, 
  CardColumns,
  Card, 
  // Button
} from 'react-bootstrap'


function Comments(props) {
  let isPages = props.contentType === 'pages'
  if(isPages) {
    return <p style={{color: 'red', marginBottom:'30px'}}>Pages cannot show the Featured Images.</p>
  } else {
    return null
  }
}

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      featuredmedia: ''
    };
    this.contentType = props.contentType
    this.siteUrl = props.siteUrl

    this.createMarkup = this.createMarkup.bind(this)
  }

  componentDidMount() {
    axios.get(this.siteUrl + '/wp-json/wp/v2/' + this.contentType)
      .then(posts => {
        console.log(posts.data[0])
        console.log(posts.data[0]._links["wp:attachment"][0].href)
        console.log(posts.data[0]._links["wp:featuredmedia"][0].href)
        this.setState({
          posts: posts.data,
        })        
      })

  }

  createMarkup(html) {
    return { __html: html };
  }

  render() {
    return (
      <div className="container">
        <h1 style={{ textTransform: "uppercase" }}>{this.contentType}</h1>
        <br />
        <Comments contentType={this.contentType} />
        <h2>URL: {this.siteUrl}</h2><br />
        {/* 
                {this.state.posts.map(post => (
                    <Link to={`/${post.slug}`} key={post.id}>
                        <div className="card" key={post.id}>
                            <div className="card-content">
                                <h3>{post.title.rendered}</h3>
                                <div dangerouslySetInnerHTML={this.createMarkup(post.excerpt.rendered)} />
                            </div>
                        </div>
                    </Link>
                ))}
                 */}

        {/* Default 3 columns */}
        <CardColumns>
          {this.state.posts.map(post => (
            <Card key={post.id} className="p-2">
              <Card.Img
                variant="top"
                src={post.jetpack_featured_media_url}
              />
              <Card.Body>
                <Card.Title>
                  {post.title.rendered}
                </Card.Title>
                {/* <Card.Text> */}
                <div className="card-text">
                  <div dangerouslySetInnerHTML={this.createMarkup(post.excerpt.rendered)} />
                </div>
                {/* </Card.Text> */}
                {/* <Button>Read more...</Button> */}
                <Link to={`/${this.contentType}/` + post.slug}>Read More..</Link>
              </Card.Body>
            </Card>
          ))}
        </CardColumns>

      </div>
    );
  }
}

export default PostList;