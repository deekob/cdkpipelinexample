import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core';
import { CdkpipelineDemoStack } from './cdkpipeline-demo-stack';

/**
 * Deployable unit of web service app
 */
export class CdkpipelinesDemoStage extends Stage {
    public readonly urlOutput: CfnOutput;
    
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);
  
      const service = new CdkpipelineDemoStack(this, 'WebService');
      
      // Expose CdkpipelinesDemoStack's output one level higher
      this.urlOutput = service.urlOutput;
    }
  }