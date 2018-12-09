import { combineReducers } from 'redux';
import { searchReducer } from './searchReducer';

const rootReducer = combineReducers({
  searchingMovies: searchReducer
});

export default rootReducer;
