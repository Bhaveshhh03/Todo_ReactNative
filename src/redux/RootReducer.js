import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

export const RootReducer = createReducer(initialState, builder => {
  // Set todos from API
  builder.addCase('SET_TODO', (state, action) => {
    state.todos = action.payload;
  });

  // Add new todo
  builder.addCase('ADD_TODO', (state, action) => {
    state.todos.unshift(action.payload);
  });

  // Delete todo
  builder.addCase('DELETE_TODO', (state, action) => {
    state.todos = state.todos.filter(todo => todo.id !== action.payload);
  });

  // Toggle completed
  builder.addCase('TOGGLE_TODO', (state, action) => {
    const todo = state.todos.find(
      t => t.id === action.payload, //finding the todo by id which is coming from dispatch
    );

    if (todo) {
      todo.completed = !todo.completed;
      todo.updated_at = new Date().toISOString();
    }
  });

  // Edit todo
  builder.addCase('EDIT_TODO', (state, action) => {
    const { id, title } = action.payload;

    const todo = state.todos.find(t => t.id === id); //for finding the todo to be edited

    if (todo) {
      todo.title = title;
      todo.updated_at = new Date().toISOString();
    }
  });
});
