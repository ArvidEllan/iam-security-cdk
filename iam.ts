import { App, Stack, StackProps } from 'aws-cdk-lib';
import { IAMRole, IAMPolicy, PolicyStatement, Effect, PolicyDocument } from 'aws-cdk-lib/aws-iam';
import { DynamoDBTable } from 'aws-cdk-lib/aws-dynamodb';

class IAMPolicyValidationStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // Retrieve all IAM roles and policies defined in the deployment scripts
    const iamRoles = this.node.findAll(IAMRole);
    const iamPolicies = this.node.findAll(IAMPolicy);

    // Validate IAM roles and policies
    this.validateIAMRoles(iamRoles);
    this.validateIAMPolicies(iamPolicies);
  }

  validateIAMRoles(iamRoles: IAMRole[]) {
    for (const role of iamRoles) {
      // Check if the role grants full access to DynamoDB
      const permissiveStatements = role.assumeRolePolicy.statementCount > 0
        ? role.assumeRolePolicy.statements.filter(s => s.effect === Effect.ALLOW && s.actions.includes('dynamodb:*'))
        : [];

      if (permissiveStatements.length > 0) {
        throw new Error(`IAM role '${role.roleName}' grants full access to DynamoDB, which is not allowed.`);
      }
    }
  }

  validateIAMPolicies(iamPolicies: IAMPolicy[]) {
    for (const policy of iamPolicies) {
      // Check if the policy grants full access to DynamoDB
      const permissiveStatements = policy.document.statementCount > 0
        ? policy.document.statements.filter(s => s.effect === Effect.ALLOW && s.actions.includes('dynamodb:*'))
        : [];

      if (permissiveStatements.length > 0) {
        throw new Error(`IAM policy '${policy.policyName}' grants full access to DynamoDB, which is not allowed.`);
      }
    }
  }
}

