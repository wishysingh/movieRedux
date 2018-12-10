import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { detailsReducer } from "./detailsReducer";

const rootReducer = combineReducers({
  searchingMovies: searchReducer,
  detailsMovies: detailsReducer
});

export default rootReducer;
