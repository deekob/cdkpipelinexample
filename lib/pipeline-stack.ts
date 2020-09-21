import * as cdk from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as pipelines from "@aws-cdk/pipelines";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import { CdkPipeline } from '@aws-cdk/pipelines';
import { SecretValue } from '@aws-cdk/core';

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
              oauthToken: SecretValue.secretsManager('github-token'),
              owner: 'deekob',
              repo: 'cdkpipelinexample'
          }),
      });

      // add stages here
      
    
    }
}
