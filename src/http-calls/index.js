import { BASE_URL } from '../config/index';
import { makePostRequest, makeGetRequestNonJSON } from '../http-connectors';

export const joinRoom = payload => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      `${process.env.REACT_APP_GAME_SERVER_BASE_URL}/joinRoom`,
      false,
      payload
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("joinRoom error: ", e);
        reject(e);
      });
  });
};

export const createRoom = payload => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      `${process.env.REACT_APP_GAME_SERVER_BASE_URL}/createRoom`,
      false,
      payload
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("createRoom error: ", e);
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