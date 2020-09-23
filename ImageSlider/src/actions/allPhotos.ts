import {FETCHED, FETCHING} from './types';

export const fetching = () => {
  return {
    type: FETCHING,
  };
};
export const fetched = (data: []) => {
  return {
    type: FETCHED,
    data,
  };
};
