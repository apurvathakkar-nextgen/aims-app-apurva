import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class BackendStack extends cdk.Stack {
  public readonly apiEndpoint: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a Lambda function
    const myLambda = new lambda.Function(this, 'MyLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'), // Make sure you have a lambda/index.js file
    });

    // Create a REST API Gateway resource
    const api = new apigateway.RestApi(this, 'MyApi', {
      restApiName: 'aims-api',
      description: 'This service serves my backend API.',
    });

    // Connect the Lambda function to the API Gateway
    const lambdaIntegration = new apigateway.LambdaIntegration(myLambda);
    const itemsResource = api.root.addResource('items');
    itemsResource.addMethod('GET', lambdaIntegration); // GET /items

    // Save the API endpoint (this is a simple string that your front end can call)
    this.apiEndpoint = api.url;

    // Output the API endpoint so you can see it after deployment
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.url,
      exportName: 'ApiEndpoint',
    });
  }
}
