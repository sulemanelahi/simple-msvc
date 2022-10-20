import { APIGatewayProxyEvent, APIGatewayProxyResult } from '../../../../dependencies/nodejs/node_modules/@types/aws-lambda';
import Controller from '../../../controllers/organization/products/create';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  };

  try {
    const data = await Controller(event.pathParameters, event?.body);
    response = {
      statusCode: 200,
      body: JSON.stringify(data),
      isBase64Encoded: false,
      headers,
    };
  } catch (error) {
    const data = {
      name: (error as Error)?.name,
      message: (error as Error)?.message,
      stack: (error as Error)?.stack,
    };
    response = {
      statusCode: 500,
      body: JSON.stringify(data),
      isBase64Encoded: false,
      headers,
    }
  }

 return response
};
