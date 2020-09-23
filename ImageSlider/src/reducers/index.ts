import {combineReducers} from 'redux';
import Allphotos from './AllphotosReducer';

// Combine all the reducers
const appReducer = combineReducers({
  Allphotos,
});

export default appReducer;
