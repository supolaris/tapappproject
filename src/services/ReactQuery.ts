import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "./ApiClient";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

const request = async (
  method: HttpMethod,
  url: string,
  data?: any,
  customBaseURL?: string
) => {
  const response = await apiClient.request({
    method,
    url,
    data,
    baseURL: customBaseURL,
  });

  return response.data;
};

/* -------------------- GET -------------------- */

export const useGetQuery = (
  queryKey: string,
  url: string,
  staleTime = 5 * 60 * 1000,
  customBaseURL?: string
) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => request("get", url, undefined, customBaseURL),
    staleTime,
  });
};

/* -------------------- POST -------------------- */

export const usePostMutation = (url: string, customBaseURL?: string) => {
  return useMutation({
    mutationFn: (data: any) => request("post", url, data, customBaseURL),
  });
};

/* -------------------- PATCH -------------------- */

export const usePatchMutation = (url: string, customBaseURL?: string) => {
  return useMutation({
    mutationFn: (data: any) => request("patch", url, data, customBaseURL),
  });
};

/* -------------------- DELETE -------------------- */

export const useDeleteMutation = (url: string, customBaseURL?: string) => {
  return useMutation({
    mutationFn: () => request("delete", url, undefined, customBaseURL),
  });
};

/* -------------------- INFINITE QUERY -------------------- */

export const useInfiniteQueryRequest = (
  queryKey: string,
  url: string,
  perPage = 10,
  customBaseURL?: string
) => {
  return useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam = 1 }) =>
      request(
        "get",
        `${url}?page=${pageParam}&perPage=${perPage}`,
        undefined,
        customBaseURL
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      return lastPage?.metadata?.hasNext
        ? lastPage.metadata.page + 1
        : undefined;
    },
  });
};
