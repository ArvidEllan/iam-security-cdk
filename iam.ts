import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as snsSubscriptions from 'aws-cdk-lib/aws-sns-subscriptions';

export class IamPolicyCheckerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Example IAM role
    const role = new iam.Role(this, 'MyRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    // Attach a policy to the role
    const policy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['dynamodb:*'],
      resources: ['*'],
    });

    role.addPolicy(policy);

    // Logic to check for full DynamoDB access and alert
    this.checkIamPolicy(role);
  }

  private checkIamPolicy(role: iam.Role) {
    // Here you would implement the logic to check if the role has full access to DynamoDB
    // For demonstration, let's assume we're logging the policy
    console.log(`Role ${role.roleName} has the following policy: ${JSON.stringify(roleAttachedPolicies)}`);
    
    // If full access is detected, you would typically use AWS CDK's logging or integrate with an alerting service
  }
}

// Instantiate the stack
const app = new cdk.App();
new IamPolicyCheckerStack(app, 'IamPolicyCheckerStack');
