#!/usr/bin/env node
const cdk = require('@aws-cdk/core');
const { AwSsqswithlambdaDemoStack } = require('../lib/aw_ssqswithlambda_demo-stack');

const app = new cdk.App();
// @ts-ignore
new AwSsqswithlambdaDemoStack(app, 'AwSsqswithlambdaDemoStack');
