import React, { Component } from "react";
import axios from "axios";
import conf from '../conf'

class PostView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {}
        };
        this.contentType = props.contentType
        
        this.createMarkup = this.createMarkup.bind();
    }

    componentDidMount() {
        console.log('props: ', this.props.match)
        // const slug = this.props.match.params.slug;        
        const slug = this.props.match.params.name; // must match the key(name) to Route path param        
        axios
            .get(conf.siteUrl + `/wp-json/wp/v2/${this.contentType}?slug=${slug}`)
            .then(post => {
                console.log(post.data)
                this.setState({
                    post: post.data[0]
                });
            });
    }

    createMarkup(html) {
        return { __html: html };
    }

    render() {
        let build;
        let imageStyle = {
            textAlign: 'center'
        }
        if (this.state.post.title) {
            build = (
                <div className="container">
                    <h1 style={imageStyle}>{this.state.post.title.rendered}</h1>
                    <div style={imageStyle}>
                        <img src={this.state.post.jetpack_featured_media_url} width="90%" alt="some" />
                    </div>
                    <div dangerouslySetInnerHTML={this.createMarkup(this.state.post.content.rendered)} />
                    <hr />
                    <h5>Type: {this.state.post.type}</h5>
                    <p>GUID : {this.state.post.guid.rendered}</p>
                    <p>LINK : {this.state.post.link}</p>
                    <p>Written: {this.state.post.modified}</p>
                    <p>Status : {this.state.post.status}</p>
                    <p>
                        <i className="fa fa-images"></i>
                        Image Url : {this.state.post.jetpack_featured_media_url}
                    </p>
                </div>
            );
        } else {
            build = <div />;
        }
        return build;
    }
}

export default PostView;