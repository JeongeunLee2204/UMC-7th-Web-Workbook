import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MOVIE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export { axiosInstance };
