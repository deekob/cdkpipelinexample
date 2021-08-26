import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core';
import { CdkpipelineDemoStack } from './cdkpipeline-rest-api-stack';
import { HWNPipelineStackWithStage } from './pipeline-stack';

/**
 * Deployable unit of web service app
 */
export class PipelineRestApiStage extends Stage {
    public readonly urlOutput: CfnOutput;
    
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);
  
      const service = new CdkpipelineDemoStack(this, 'WebService');
      
    }
  }