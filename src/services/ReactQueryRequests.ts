import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "./ApiClient";
import { apisConfig } from "./ApiConfigs";

export const getRequest = (endPoint: string, staleTime?: number) => {
  console.log("endPoint =>>>>>>>", endPoint);

  const response = useQuery({
    queryKey: [endPoint],
    queryFn: async () => {
      const res = await apiClient.get(endPoint);
      return res.data;
    },
    staleTime: staleTime ?? 5 * 60 * 1000,
  });

  return response;
};

export const patchRequest = (endPoint: string) => {
  const response = useMutation({
    mutationFn: async (data: any) => await apiClient.patch(`${endPoint}`, data),
  });

  return response;
};

export const putRequest = (endPoint: string) => {
  const response = useMutation({
    mutationFn: async (data: any) => await apiClient.patch(`${endPoint}`, data),
  });

  return response;
};

export const postRequest = (endPoint: string) => {
  const response = useMutation({
    mutationFn: async (data: any) => await apiClient.post(`${endPoint}`, data),
  });

  return response;
};

export const postCustomURLRequest = (
  endPoint: string,
  customBaseURL: string,
) => {
  const response = useMutation({
    mutationFn: async (data: any) =>
      await apiClient.post(`${endPoint}`, data, {
        baseURL: customBaseURL,
      }),
  });

  return response;
};

export const deleteRequest = (endPoint: string) => {
  const response = useMutation({
    mutationFn: async () => await apiClient.delete(`${endPoint}`),
  });

  return response;
};

export const infiniteQueryRequest = (
  endPoint: string,
  queryKey: string,
  isQueryStart?: boolean,
  perPage?: number,
  customBaseURL?: string,
) => {
  const fetchPage = async (pageParam: number) => {
    const res = await apiClient.get(
      `${endPoint}${
        isQueryStart ? "?" : "&"
      }page=${pageParam}&perPage=${perPage ?? apisConfig.perPage}`,
      { baseURL: customBaseURL },
    );

    return res.data;
  };

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isRefetching,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam = 1 }) => fetchPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.kind !== "OK") return undefined;
      const metadata = lastPage?.data?.result?.metadata;
      return metadata?.hasNext ? metadata?.page + 1 : undefined;
    },
  });

  const responseData =
    data?.pages?.flatMap((page) =>
      page.kind === "OK" ? page.data?.result?.data : [],
    ) || [];

  return {
    responseData,
    error,
    isLoading,
    hasNextPage,
    isRefetching,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  };
};
