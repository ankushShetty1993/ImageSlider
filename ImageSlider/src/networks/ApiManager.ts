import axios from 'axios';

//Expects Token
export const apiGet = async url => {
  console.log(url);
  try {
    const response = await axios.get(url);
    console.log('response main:', response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
