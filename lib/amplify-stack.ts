import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';

export class AmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Custom buildSpec that returns a YAML string
    const myBuildSpec: codebuild.BuildSpec = {
      isImmediate: false,
      toBuildSpec: () => `
version: "1"
frontend:
  phases:
    preBuild:
      commands:
        - cd frontend
        - npm ci
        - ls ./src
        - cp amplify_outputs.json ./src/amplify_outputs.json
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: frontend/build
    files:
      - "**/*"
  cache:
    paths:
      - frontend/node_modules/**/*
`
    };

    const amplifyApp = new amplify.App(this, 'AIMS-App', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'apurvathakkar-nextgen',
        repository: 'aims-app-apurva',
        oauthToken: cdk.SecretValue.secretsManager('github-token'),
      }),
      buildSpec: myBuildSpec,
    });

    const mainBranch = amplifyApp.addBranch('main');
    amplifyApp.addEnvironment('AMPLIFY_ENV', 'dev');

    new cdk.CfnOutput(this, 'AmplifyAppURL', {
      value: amplifyApp.defaultDomain,
    });
  }
}
