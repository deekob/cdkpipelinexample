#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HWNPipelineStackWithStage} from '../lib/pipeline-stack';
const app = new cdk.App();
 new HWNPipelineStackWithStage (app, 'HWNPipeLineStack',
 {
     env: {account: '978928857807', region: 'ap-southeast-1'},
 });
app.synth();
