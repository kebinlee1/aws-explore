var AWS = require('aws-sdk');

var s3 = new AWS.S3();

// 버킷 이름은 모든 S3 사용자에게 고유한 것이어야 합니다.

var myBucket = 'kebin-manual-creation';

var myKey = 'myBucketKey';

// s3.createBucket({ Bucket: myBucket }, function (err, data) {

//   if (err) {

//     console.log(err);

//   } else {

//     params = { Bucket: myBucket, Key: myKey, Body: 'Hello!' };

//     s3.putObject(params, function (err, data) {

//       if (err) {

//         console.log(err)

//       } else {

//         console.log("Successfully uploaded data to myBucket/myKey");

//       }

//     });

//   }

// });

var params = { Bucket: myBucket, Key: myKey, Body: 'Hello!' };

s3.putObject(params, function (err, data) {

  if (err) {

    console.log(err)

  } else {

    console.log("Successfully uploaded data to myBucket/myKey");

  }

});


