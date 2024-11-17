import { useQuery } from "react-query";
import { axiosInstance } from "../../apis/axios-instance.js";

const useCustomFetch = (endpoint, queryKey) => {
  return useQuery(
    queryKey,
    async () => {
      const { data } = await axiosInstance.get(endpoint);
      return data.results;
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      retry: 1,
    }
  );
};

export default useCustomFetch;
