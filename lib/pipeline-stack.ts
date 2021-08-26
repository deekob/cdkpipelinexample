import { ManualApprovalAction } from '@aws-cdk/aws-codepipeline-actions';
import * as cdk from '@aws-cdk/core';
import { Stage } from '@aws-cdk/core';
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from '@aws-cdk/pipelines';
import { PipelineRestApiStage } from './pipeline-stage';

export class HWNPipelineStackWithStage extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'HWNCodePipelineWithStage',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('deekob/cdkpipelinexample', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
   

   const UAT = pipeline.addStage(new PipelineRestApiStage(this, "Test", {
      env: { account: "978928857807", region: "ap-southeast-1" }
   }));

   UAT.addPost(new ManualApprovalStep("Approve Release to Prod"));
  
   const PRD = pipeline.addStage(new PipelineRestApiStage(this, 'Prod', {
    env:{account:'978928857807', region:'ap-southeast-1'}
   }))
  
    
  }
}