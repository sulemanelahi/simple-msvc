// @ts-ignore
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Controller from '../../../controllers/organization/products/create';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
    };
    let response: APIGatewayProxyResult;

    try {
        const body = JSON.parse(event?.body!);
        const data = await Controller(event?.pathParameters?.organizationId, body);
        response = {
            statusCode: 200,
            body: data,
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
        };
    }

    return response;
};
