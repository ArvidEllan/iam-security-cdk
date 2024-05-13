# iam-security-cdk questions
IAM Policy Validation Script (CDK) This script utilizes the AWS CDK library to validate IAM roles and policies within your deployment for full access to DynamoDB. It helps prevent accidental deployments granting excessive permissions.

Requirements: Node.js and npm installed AWS CDK installed (npm install aws-cdk-lib) Basic understanding of CDK and IAM concepts Deployment:

Ensure the script is saved as a .js or .ts file (e.g., iam-policy-validation.js).

Deploy the script using the CDK command:

Bash cdk deploy <stack_name> -c environment=local

content_copy Replace <stack_name> with your desired stack name. The -c environment=local flag specifies deployment to a local mock environment (LocalStack).

Functionality:

The script retrieves all defined IAM roles and policies within the deployment scope using CDK constructs (optional: replace with retrieving roles/policies from existing infrastructure). It iterates through each role and checks its assumeRolePolicy for statements allowing full DynamoDB access (dynamodb:*). It then iterates through each policy and checks its document for statements allowing full DynamoDB access. If any role or policy grants full DynamoDB access, an error is thrown, blocking the deployment.

Pseudocode:

Define function validateIAMRoles(roles):

Loop through each role in roles:
Check if the role's assumeRolePolicy allows dynamodb:* action:
If yes, throw an error indicating full DynamoDB access granted by role.
Define function validateIAMPolicies(policies):

Loop through each policy in policies:
Check if the policy document allows dynamodb:* action:
If yes, throw an error indicating full DynamoDB access granted by policy.
Retrieve all IAM roles and policies from deployment scope (or existing infrastructure).

Call validateIAMRoles with retrieved roles.

Call validateIAMPolicies with retrieved policies.

If no errors are thrown, deployment proceeds.

It integrates with Github Actions where its triggered in the infrastructure deployment step and it checks if any IAM policies grant full IAM access to dynamodb tables.If a policy is found the deployment will be halted and an alert will be sent to the team