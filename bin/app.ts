#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AmplifyStack } from '../lib/amplify-stack';
import { BackendStack } from '../lib/backend-stack';

const app = new cdk.App();

new AmplifyStack(app, 'AmplifyAppStack', {});
const backendStack = new BackendStack(app, 'BackendStack', {});
