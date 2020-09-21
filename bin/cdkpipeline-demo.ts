#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkpipelineDemoStack } from '../lib/cdkpipeline-demo-stack';

const app = new cdk.App();
new CdkpipelineDemoStack(app, 'CdkpipelineDemoStack',
{
    env: {account: '978928857807', region: 'ap-southeast-2'},
});

app.synth();
