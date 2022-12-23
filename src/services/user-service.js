import axios from "axios";
import { URI } from "../constants/constants";

export const login = (loginDetails, successCallBack, failureCallBack) => {
  axios
    .post(URI + "/api/v1/tweetapp/user/signin", loginDetails)
    .then((res) => {
      console.log(res.data);
      successCallBack(res.data);
    })
    .catch((er) => {
      console.log(er.response);
      failureCallBack(er.response);
    });
};

export const register = (registerDetails, successCallBack, failureCallBack) => {
  axios
    .post(URI + "/api/v1/tweetapp/user/signup", registerDetails)
    .then((res) => {
      console.log(res.data);
      successCallBack(res.data);
    })
    .catch((er) => {
      console.log(er.response);
      failureCallBack(er.response);
    });
};

export const forgotPassword = (
  forgotPasswordDetails,
  successCallBack,
  failureCallBack
) => {
  axios
    .post(
      URI + "/api/v1/tweetapp/user/resetPassword" ,
      forgotPasswordDetails
    )
    .then((res) => {
      console.log(res.data);
      successCallBack(res.data);
    })
    .catch((er) => {
      console.log(er.response);
      failureCallBack(er.response);
    });
};

export const getAllUsers = (token, successCallBack, failureCallBack) => {
  axios
    .get(URI + "/api/v1/tweetapp/user/all", {
      headers: { Authorization: `Bearer ${token} ` },
    })
    .then((res) => {
      successCallBack(res.data);
    })
    .catch((er) => {
      failureCallBack(er.response);
    });
};

export const searchUsers = (
  token,
  loginId,
  successCallBack,
  failureCallBack
) => {
  axios
    .get(URI + "/api/v1/tweetapp/user/all/" + loginId, {
      headers: { Authorization: `Bearer ${token} ` },
    })
    .then((res) => {
      successCallBack(res.data);
    })
    .catch((er) => {
      failureCallBack(er.response);
    });
};
