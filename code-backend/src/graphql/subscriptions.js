/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStats = /* GraphQL */ `
  subscription OnCreateStats($filter: ModelSubscriptionStatsFilterInput) {
    onCreateStats(filter: $filter) {
      id
      visitorCount
      likeCount
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStats = /* GraphQL */ `
  subscription OnUpdateStats($filter: ModelSubscriptionStatsFilterInput) {
    onUpdateStats(filter: $filter) {
      id
      visitorCount
      likeCount
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStats = /* GraphQL */ `
  subscription OnDeleteStats($filter: ModelSubscriptionStatsFilterInput) {
    onDeleteStats(filter: $filter) {
      id
      visitorCount
      likeCount
      createdAt
      updatedAt
    }
  }
`;
