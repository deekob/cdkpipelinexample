#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PipeLineStack } from '../lib/pipeline-stack';
const app = new cdk.App();
 new PipeLineStack (app, 'PipeLineStack',
 {
     env: {account: '978928857807', region: 'ap-southeast-2'},
 });


app.synth();
