const { invoke } = require("./src/LambdaUtil");
const { getObject, putObject } = require("./src/S3Util");

exports.handler =  async function(event, context, callback) {
    try {
        const s3Object = await getObject({
            Bucket: 'training-yutingli-lambda-bucket',
            Key: event.filename
        });
        const buffer = JSON.stringify(s3Object);

        await putObject({
            Bucket: 'training-yutingli-lambda-bucket',
            Key: `updated-${event.filename}-${new Date().toISOString().replace(/\..+/, '')}`,
            buffer
        });

        await invoke('yutingli-log-lambda', { log: true });
        callback(null, { buffer });
    } catch (e) {
        console.log("EVENT: \n" + JSON.stringify(event, null, 2));
        throw e;
    }
};
