const {Lambda} = require("aws-sdk");

const lambda = new Lambda({
    region: 'ap-southeast-1'
});

const invoke = async (functionName, event) => lambda.invoke({
    FunctionName: functionName,
    Payload: JSON.stringify(event, null, 2)
  }, function (error, data) {
    if (error) {
        context.done('error', error);
    }
    if (data.Payload) {
        console.log(data.Payload);
    }
});

module.exports = { invoke };
