import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import newsReducer from "../reducers/NewsReducer";
import blogsReducer from "../reducers/BlogsReducer";

const rootReducer = combineReducers({
  news: newsReducer,
  blogs: blogsReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
