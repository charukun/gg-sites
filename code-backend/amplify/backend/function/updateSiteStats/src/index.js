const { Amplify } = require('aws-amplify');
const { generateClient } = require('aws-amplify/api');
const awsconfig = require('./aws-exports');

Amplify.configure(awsconfig);
const client = generateClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        const result = await client.graphql({
            query: /* GraphQL */ `
                mutation UpdateStats($input: UpdateStatsInput!) {
                    updateStats(input: $input) {
                        id
                        visitorCount
                        likeCount
                    }
                }
            `,
            variables: {
                input: {
                    id: 'global-stats',
                    visitorCount: event.visitorCount,
                    likeCount: event.likeCount
                }
            }
        });
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
