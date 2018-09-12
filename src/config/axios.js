import axios from "axios";

export default function() {
  axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
}
