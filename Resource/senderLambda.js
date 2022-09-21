var AWS = require('aws-sdk');
var sqs = new AWS.SQS({region : 'us-east-1'});
// @ts-ignore
exports.handler = async function(event){
    let sqs_url = sqs.endpoint.href
    let queueArn = process.env.QueueArn;
    let queueName = process.env.QueueName
    let queue_url = sqs_url + queueArn.toString().substring(22,34) + "/" + queueName
    const params = {
        MessageBody:"Hello World",
        QueueUrl: queue_url
    }
    
    return sqs.sendMessage(params,function(err,data){
        if(err){
            console.log(err)
        }else{
            console.log(data);
        }
    }).promise()
}