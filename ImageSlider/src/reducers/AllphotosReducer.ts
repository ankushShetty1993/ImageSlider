import {FETCHED, FETCHING} from '../actions/types';

const initialState = {
  fetched: false,
  fetching: false,
  data: [],
};

const Allphotos = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        fetched: false,
        fetching: true,
        data: [],
      };

    case FETCHED:
      return {
        ...state,
        fetched: true,
        fetching: false,
        data: action.data,
      };

    default:
      return state;
  }
};

export default Allphotos;
