import * as _deepClone from "clone-deep";
import { ToastsStore } from "react-toasts";
import { clearUserData } from "../redux/actions/user-data";
import { store } from "../redux/store";

export const logout = (navRef) => {
  store.dispatch(clearUserData());
  // Clear other reducers data also
  if (navRef) {
    navRef.replace("/login");
  }
};

export const deepClone = (data) => {
  return _deepClone(data);
};

export const sleepTime = (n) => new Promise((r) => setTimeout(() => r(), n));

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const showToast = (message, type = "error") => {
  ToastsStore[type](message, 4000);
};

export const extractQueryParams = () => {
  let {
    location: { search: queryParamString },
  } = window;
  let params = {};
  if (queryParamString.length > 1 && queryParamString.indexOf("?") > -1) {
    queryParamString = queryParamString.replace("?", "");
    if (queryParamString.indexOf("&") === -1) {
      // Contains only one param
      const paramParts = queryParamString.split("=");
      params[paramParts[0]] = paramParts[1];
    } else {
      // Contains multiple params
      const queryParams = queryParamString.split("&");
      queryParams.forEach((queryParam) => {
        const paramParts = queryParam.split("=");
        params[paramParts[0]] = paramParts[1];
      });
    }
  }
  return params;
};
