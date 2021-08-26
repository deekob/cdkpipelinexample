import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

export class CdkpipelineDemoStack extends Stack {
  public readonly urlOutput: CfnOutput;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const welcomeLambda = new lambda.Function(this, 'helloHandler',
    {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler'
    })

    const api = new apigw.RestApi(this, 'helloApi');
    const apiHelloIntegration = new apigw.LambdaIntegration (welcomeLambda);
    const apiHello = api.root.addResource('hello');
    apiHello.addMethod('Get', apiHelloIntegration);
   
    this.urlOutput = new CfnOutput(this, 'Url', {
      value: api.url,
    });
  }
}
