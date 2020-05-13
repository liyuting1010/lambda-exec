const { S3 } = require("aws-sdk");

const s3 = new S3();

const getObject = (args) => {
    const params = {
        Bucket: args.Bucket,
        Key: args.Key,
    };
    return s3.getObject(params).promise();
};

const putObject = (args) => {
    const params = {
        Bucket: args.Bucket,
        Key: args.Key,
        Body: args.buffer,
        ContentType: "json"
    };
    return s3.putObject(params).promise();
};

module.exports = { getObject, putObject };
