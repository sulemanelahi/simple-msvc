import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Controller from '../../../controllers/organization/products/create';
import { environment } from '../../../environments';

export const handler = async ({ pathParameters, body }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    data: null,
    isBase64Encoded: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
    },
  };
  try {
    const data = await Controller(pathParameters?.organizationId, body);
    response.body = JSON.stringify({ data });
  } catch (error) {
    response.statusCode = 400;
    response.data = {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    };
  }

  return response;
};
