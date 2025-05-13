import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

// API Key認証のみを使用するように設定
Amplify.configure({
  ...awsconfig,
  API: {
    GraphQL: {
      endpoint: awsconfig.aws_appsync_graphqlEndpoint,
      region: awsconfig.aws_appsync_region,
      authenticationType: 'API_KEY',
      apiKey: awsconfig.aws_appsync_apiKey
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
