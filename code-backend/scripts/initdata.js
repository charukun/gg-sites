const { Amplify } = require('aws-amplify');
const { generateClient } = require('aws-amplify/api');

// aws-exports.jsの内容を直接記述
const awsconfig = {
  "aws_project_region": "ap-northeast-1",
  "aws_appsync_graphqlEndpoint": "https://mqlbtwnh5jgg3m43f2r7jxj63m.appsync-api.ap-northeast-1.amazonaws.com/graphql", // 実際のエンドポイント
  "aws_appsync_region": "ap-northeast-1",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "da2-zrtmljwbbfgmfmqqdmrz3etigm" // 実際のAPI Key
};

Amplify.configure(awsconfig);
const client = generateClient();

// 初期データ投入用のミューテーション
const createStats = /* GraphQL */ `
  mutation CreateStats($input: CreateStatsInput!) {
    createStats(input: $input) {
      id
      visitorCount
      likeCount
      createdAt
      updatedAt
    }
  }
`;

async function initializeStats() {
  try {
    console.log('Initializing stats...');
    const result = await client.graphql({
      query: createStats,
      variables: {
        input: {
          id: 'global-stats',
          visitorCount: 0,
          likeCount: 0
        }
      }
    });
    console.log('Stats initialized successfully:', result);
  } catch (error) {
    console.error('Error initializing stats:', error);
  }
}

initializeStats();
