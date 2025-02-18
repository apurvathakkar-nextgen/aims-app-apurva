import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class AmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new cdk.CfnOutput(this, 'AmplifySetup', {
      value: 'Amplify Backend Deployed Successfully!',
    });
  }
}
