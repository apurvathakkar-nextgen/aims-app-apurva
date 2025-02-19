import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';

export class AmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyApp = new amplify.App(this, 'AIMS-App', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'apurvathakkar-nextgen',
        repository: 'aims-app-apurva',
        oauthToken: cdk.SecretValue.secretsManager('github-token'),
      }),

      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          install: {
            commands: [
              "cd frontend",
              "npm ci"
            ]
          },
          build: {
            commands: [
              "npm run build"
            ]
          }
        },
        artifacts: {
          "base-directory": "frontend/build",
          files: [
            "**/*"
          ]
        },
        cache: {
          paths: [
            "frontend/node_modules/**/*"
          ]
        }
      })
    });

    const mainBranch = amplifyApp.addBranch('main');
    amplifyApp.addEnvironment('AMPLIFY_ENV', 'dev');

    new cdk.CfnOutput(this, 'AmplifyAppURL', {
      value: amplifyApp.defaultDomain,
    });
  }
}
