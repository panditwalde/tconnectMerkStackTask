import axios from "axios";

const baseurl = "http://localhost:8080";

export const apiGet = (url, token) => {
  console.log(url)
  return axios
    .get(baseurl + url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const apiPost = (url, token, body) => {
  return axios
    .post(baseurl + url, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};


