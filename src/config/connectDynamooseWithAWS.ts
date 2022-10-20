export default (dynamoose: any, environment: any) => {
  if (process.env.AWS_SAM_LOCAL) {
    dynamoose.aws.sdk.config.update({
      region: environment.dynamo.region,
      endpoint: environment.dynamo.endpoint,
    });
  }
};
