import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import newsReducer from "../reducers/NewsReducer";
import profileReducer from "../reducers/ProfileReducer";


const middlewares = [thunk];

const rootReducer = combineReducers({
    news: newsReducer,
    profile: profileReducer
  });
  
  const store = createStore(rootReducer);

  export default store;