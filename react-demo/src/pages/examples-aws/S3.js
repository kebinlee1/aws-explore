import React, { Component } from "react";
import AWS from 'aws-sdk'
import { Button } from 'react-bootstrap'

import conf from '../conf'

//
// ref: https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v2/developer-guide/s3-example-photos-view.html
//

const albumBucketName = conf.awsConfig.photoAlbum.albumBucketName

function ViewPhotos(props) {
  if (props.photoList === null) {
    return <div></div>
  }
  let images = props.photoList.map(photo => {
    return <img key={photo.name} src={photo.url} style={{ width: "200px", height: "200px" }} alt={photo.name} />
  })

  if (props.photoList.length > 0) {
    return (
      <div>
        <h2>Album: {props.viewAlbumName}</h2>
        {images}
      </div>
    )
  } else {
    return <div><h2>No Photos</h2></div>
  }
}

function ListAlbum(props) {
  let count = 0

  if (props.albumList.length > 0) {
    return (
      <div>        
        <h2>Album List</h2>
        <ul>
          {props.albumList.map(albumName => (
            <li key={albumName + count++} style={{ textTransform: "uppercase" }}>              
              <Button variant="outline-info" onClick={props.onClick} album-name={albumName}>
                {albumName.toUpperCase()}</Button>
            </li>
          ))}
        </ul>
      </div>
    )
  } else {
    return <div><h2>No Albums</h2></div>
  }
}

class S3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumList: [],
      photoList: null
    };
    this.count = 0
    this.s3 = null

    this.listAlbum = this.listAlbum.bind(this)
    this.viewAlbum = this.viewAlbum.bind(this)
  }

  componentDidMount() {
    // Amazon Cognito 인증 공급자를 초기화합니다
    AWS.config.region = 'ap-northeast-2'; // 리전
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: conf.awsConfig.photoAlbum.IdentityPoolId
    });

    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: albumBucketName }
    })

    this.listAlbum()
  }

  listAlbum() {
    let that = this

    //
    // Delimiter '/' : directory만 표시하는 것을 의미하는 듯
    //

    that.s3.listObjects({ Delimiter: '/' }, function (err, data) {
      if (err) {
        return alert('There was an error listing your albums: ' + err.message);
      } else {

        let albumList = data.CommonPrefixes.map(function (commonPrefix) {
          var prefix = commonPrefix.Prefix;
          return decodeURIComponent(prefix.replace('/', ''));
        })

        that.setState({
          albumList: albumList
        })

      }
    })
  }

  viewAlbum(e) {
    let that = this

    let albumName = e.target.getAttribute('album-name')

    var albumPhotosKey = encodeURIComponent(albumName) + '/';
    // console.log('albumPhotoKey: ', albumPhotosKey)

    that.s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
      if (err) {
        return alert('There was an error viewing your album: ' + err.message);
      }

      var href = this.request.httpRequest.endpoint.href;
      var bucketUrl = href + albumBucketName + '/';

      // console.log('bucketUrl: ', bucketUrl)
      // console.log('Data', data.Contents)

      let photoList = data.Contents.map(photoObj => {
        let name = photoObj.Key.replace(albumPhotosKey, '')
        return {
          name: name,
          url: bucketUrl + albumName + '/' + name
        }
      })

      photoList.shift()
      console.log(photoList)

      that.setState({
        photoList: photoList,
        viewAlbumName: albumName
      })
    });

  }

  render() {
    return (
      <div className="container" >
        <h1 style={{ textTransform: "uppercase", color: "green" }}>{conf.str.title.s3PhotoAlbum}</h1>
        <hr />

        <ListAlbum albumList={this.state.albumList} onClick= {this.viewAlbum} />

        <ViewPhotos photoList={this.state.photoList} viewAlbumName={this.state.viewAlbumName} />

      </div>
    );
  }
}

export default S3;