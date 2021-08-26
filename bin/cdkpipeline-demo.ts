#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HWNMyPipelineStack} from '../lib/pipeline-stack';
const app = new cdk.App();
 new HWNMyPipelineStack (app, 'HWNPipeLineStack',
 {
     env: {account: '978928857807', region: 'ap-southeast-1'},
 });


app.synth();
