import * as cdk from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as pipelines from "@aws-cdk/pipelines";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
import {CdkpipelinesDemoStage} from './pipeline-stage'
import { SecretValue } from '@aws-cdk/core';
import { ShellScriptAction } from '@aws-cdk/pipelines';

export class PipeLineStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
 
      const sourceArtifact = new codepipeline.Artifact();
      const cloudAssemblyArtifact = new codepipeline.Artifact();

      const pipeline = new CdkPipeline(this,'Pipeline',
      {
          pipelineName: 'MyDempPipeLine',
          cloudAssemblyArtifact,
          sourceAction: new codepipeline_actions.GitHubSourceAction({
              actionName: 'GitHub',
              output: sourceArtifact,
              oauthToken: SecretValue.secretsManager('github_token'),
              owner: 'deekob',
              repo: 'cdkpipelinexample'
          }),

          synthAction: SimpleSynthAction.standardNpmSynth({
              sourceArtifact,
              cloudAssemblyArtifact,

              buildCommand: 'npm run build'
          }),
      });

      // add stages here
      
      // stages
      const uatStage = pipeline.addApplicationStage(new CdkpipelinesDemoStage(this, 'Test', {
        env:{account:'978928857807', region:'ap-southeast-2'}
    }))

    uatStage.addManualApprovalAction();
    
    const prdStage = pipeline.addApplicationStage(new CdkpipelinesDemoStage(this, 'Prod', {
      env:{account:'978928857807', region:'ap-southeast-2'}
  }))
 } 
}
