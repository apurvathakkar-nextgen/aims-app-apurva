#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AmplifyStack } from '../lib/amplify-stack';

const app = new cdk.App();
new AmplifyStack(app, 'AmplifyAppStack', {});
