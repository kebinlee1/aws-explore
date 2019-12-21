import React, { Component } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// import {
//     CardGroup, CardDeck, CardColumns,
//     Card, Button
// } from 'react-bootstrap'

import conf from '../conf'

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };        

    }

    componentDidMount() {        

    }

    render() {
        return (
            <div className="container">
                <h1 style={{textTransform: "uppercase"}}>{conf.str.title.createPost}</h1>    
                <h2>Posting을 React로 하는것은 아직 무리인듯....</h2>            
            </div>
        );
    }
}

export default CreatePost;