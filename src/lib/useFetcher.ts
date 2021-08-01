import useSWR, { SWRResponse } from "swr";
import { Configuration } from "swr/dist/types";

const fetcher = (input: any, ...args: any[]) =>
  fetch(input, ...args).then((res) => res.json());

export default function useFetcher<Data = any, Error = any>(
  route: string,
  useSWRConfiguration?: Partial<Configuration<Data, Error>>
): UseFetcherResponse<Data, Error> {
  const { data, error, ...rest } = useSWR<Data, Error>(
    route,
    fetcher,
    useSWRConfiguration
  );

  return {
    data,
    isLoading: !error && !data,
    ...rest,
  };
}

export interface UseFetcherResponse<Data, Error>
  extends SWRResponse<Data, Error> {
  isLoading: boolean;
}
