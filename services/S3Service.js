let AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
let S3 = new AWS.S3({apiVersion: '2006-03-01'});

var fs = require('fs');
let service = ()=>{};

service.upload_file = (file_path, file_key, callback)=> {
 
  
  fs.readFile(file_path, function (err, data) {
    var params = {
      Key:file_key,
      Body: data,
      Bucket : 'emapavigsprod'
    };
    s3.upload(params,function (error, result) {
        console.log(result);
        return callback(error, result);
    });
  });
}

service.eliminar_foto=async (key)=>{
  
  let params={Bucket:"emapavigsprod",Key: key}
  
  S3.deleteObject(params,(err,datos)=>{
    if (err) return false; 
    return true;
  });
   
}
module.exports = service;