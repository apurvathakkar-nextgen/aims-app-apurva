import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from '@aws-cdk/aws-amplify-alpha';

export class AmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an AWS Amplify App
    const amplifyApp = new amplify.App(this, 'AIMS-App', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'apurvathakkar-nextgen', // GitHub username
        repository: 'aims-app-apurva', // Just the repo name, no full URL
        oauthToken: cdk.SecretValue.secretsManager('github-token'), // Ensure this exists in AWS Secrets Manager
      }),
    });

    // Add a branch (e.g., 'main')
    const mainBranch = amplifyApp.addBranch('main'); // Change to the branch you want to deploy

    // Add an environment variable
    amplifyApp.addEnvironment('AMPLIFY_ENV', 'dev');

    // Output the app URL
    new cdk.CfnOutput(this, 'AmplifyAppURL', {
      value: amplifyApp.defaultDomain,
    });
  }
}
