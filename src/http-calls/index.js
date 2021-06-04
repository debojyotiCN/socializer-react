import { BASE_URL } from '../config/index';
import { makePostRequest, makeGetRequestNonJSON } from '../http-connectors';

export const login = loginData => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      BASE_URL + "5da203dc2f00007900f418fa",
      false,
      loginData
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};

export const getVideoCallToken = (identity, roomName) => {
  return new Promise((resolve, reject) => {
    makeGetRequestNonJSON(
      `${process.env.REACT_APP_TOKEN_SERVER_BASE_URL}/videoToken?identity=${identity}&roomName=${roomName}`,
      false
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("getVideoCallToken error: ", e);
        reject(e);
      });
  });
};