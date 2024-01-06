import { MutationKey, QueryClient, QueryClientConfig, QueryKey, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query";


const baseConfig: QueryClientConfig = {
    // override this with custom config
    defaultOptions: {}

}
export const queryClient = new QueryClient(baseConfig)

type DefaultError = Error;

export function useCustomQuery<TData, TError = DefaultError>(
    options: Omit<UseQueryOptions<TData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'> & {
        queryKey: string;
        queryFn: () => Promise<TData>;
    }
) {
    return useQuery<TData, TError>(options.queryKey, options.queryFn, options);
}


export function useCustomMutation<TData, TVariables>(
    options: Omit<UseMutationOptions<TData, unknown, TVariables, unknown>, 'mutationKey' | 'mutationFn'> & {
        mutationKey: MutationKey;
        mutationFn: (variables: TVariables) => Promise<TData>;
    }
) {
    return useMutation<TData, unknown, TVariables>(options.mutationKey, options.mutationFn, options);
}