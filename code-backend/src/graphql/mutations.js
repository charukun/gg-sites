/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createStats = /* GraphQL */ `
  mutation CreateStats(
    $input: CreateStatsInput!
    $condition: ModelStatsConditionInput
  ) {
    createStats(input: $input, condition: $condition) {
      id
      visitorCount
      likeCount
      createdAt
      updatedAt
    }
  }
`;
export const updateStats = /* GraphQL */ `
  mutation UpdateStats(
    $input: UpdateStatsInput!
    $condition: ModelStatsConditionInput
  ) {
    updateStats(input: $input, condition: $condition) {
      id
      visitorCount
      likeCount
      createdAt
      updatedAt
    }
  }
`;
export const deleteStats = /* GraphQL */ `
  mutation DeleteStats(
    $input: DeleteStatsInput!
    $condition: ModelStatsConditionInput
  ) {
    deleteStats(input: $input, condition: $condition) {
      id
      visitorCount
      likeCount
      createdAt
      updatedAt
    }
  }
`;
