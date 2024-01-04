import { QueryClient, QueryClientConfig } from "react-query";


const baseConfig: QueryClientConfig = {
    // override this with custom config
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                // Retry only if it's the first failure and the status code is not 200
                // 이 부분은 API 가 한번에 여러번 request 를 받으면 error 를 반환하기 때문에 넣은 로직임
                return failureCount === 1 && (error as any)?.response?.status !== 200;
            },
            retryDelay: (retryCount) => {
                // Delay for 2 seconds on retry
                return retryCount * 2000;
            },
        }
    }

}
export const queryClient = new QueryClient(baseConfig)