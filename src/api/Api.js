import axios from "axios";

export default axios.create({
  baseURL: `${window.location.protocol}//${window.location.host}`,
  // baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
