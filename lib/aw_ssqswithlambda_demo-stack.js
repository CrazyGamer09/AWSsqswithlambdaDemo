const cdk = require('@aws-cdk/core');
const lambda = require('@aws-cdk/aws-lambda')
const sqs = require('@aws-cdk/aws-sqs')
const event = require('@aws-cdk/aws-lambda-event-sources')
const destination = require('@aws-cdk/aws-lambda-destinations')


class AwSsqswithlambdaDemoStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);


    const connectQueue= new sqs.Queue(this,"connectorQueue");

    
    const senderFunction = new lambda.Function(this,'SenderFunction',{
      runtime: lambda.Runtime.NODEJS_14_X,
      code:lambda.Code.fromAsset('Resource'),
      handler:'senderLambda.handler',
      environment:{
        "QueueArn":connectQueue.queueArn,
        "QueueName":connectQueue.queueName
      },
      onSuccess:new destination.SqsDestination(connectQueue)
    })

    
    const receiverFunction =new lambda.Function(this,'receiverFunction',{
      runtime: lambda.Runtime.NODEJS_14_X,
      code:lambda.Code.fromAsset('Resource'),
      handler:'receiverLambda.handler',
    })

    
    const eventSource = new event.SqsEventSource(connectQueue);

    receiverFunction.addEventSource(eventSource);
  }
}

module.exports = { AwSsqswithlambdaDemoStack }
