import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockNews } from "./mockDataNews";
import { mockHouses } from "./mockDataHouses";

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet("/news").reply(200, mockNews);
mock.onGet("/catalog").reply(200, mockHouses);

export const newsAPI = {
  getNews() {
    return axios.get("/news").then((res) => {
          return res.data;
        });
    },
};

export const catalogAPI = {
  getHouses() {
    return axios.get("/catalog").then((res) => {
          return res.data;
        });
    },
};
