import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';

export class IamPolicyCheck extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Call the function to check IAM policies
    this.checkIamPolicies();
  }

  private checkIamPolicies() {
    // Create an IAM policy statement for DynamoDB access
    const dynamoDBPolicyStatement = new iam.PolicyStatement({
      actions: ['dynamodb:*'],
      resources: ['*'], // Check all DynamoDB tables
    });

    // Create an IAM policy
    const iamPolicy = new iam.ManagedPolicy(this, 'IamPolicy', {
      statements: [dynamoDBPolicyStatement],
    });

    // Check if any policy statement grants full access to DynamoDB
    const hasFullAccess = iamPolicy.document.hasAnyAction('dynamodb:*');

    // Throw an error to block deployment if any policy grants full access to DynamoDB
    if (hasFullAccess) {
      throw new Error('IAM policy grants full access to DynamoDB. Deployment blocked.');
    }
  }
}