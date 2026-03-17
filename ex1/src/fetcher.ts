export interface FetchConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
}

export interface FetchResponse<T> {
  success: boolean;
  data?: T;
  error?: FetchError;
}

export interface FetchError {
  type: 'network' | 'http' | 'timeout';
  message: string;
  statusCode?: number;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchData<T>(config: FetchConfig): Promise<FetchResponse<T>> {
  const maxRetries = config.retries ?? 3;
  let attempt = 0;

  while (attempt <= maxRetries) {
    const controller = new AbortController();
    const timeoutId = config.timeout
      ? setTimeout(() => controller.abort(), config.timeout)
      : undefined;

    try {
      const fetchOptions: RequestInit = {
        method: config.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(config.headers || {}),
        },
        signal: controller.signal,
      };

      if (config.body && fetchOptions.method !== 'GET' && fetchOptions.method !== 'HEAD') {
        fetchOptions.body = JSON.stringify(config.body);
      }

      const response = await fetch(config.url, fetchOptions);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        // Create an HTTP error that our catch block will process
        throw {
          isCustomHttpError: true,
          status: response.status,
          message: `HTTP error! status: ${response.status}`,
        };
      }

      const data = (await response.json()) as T;

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      let fetchError: FetchError;

      if (error.name === 'AbortError') {
        fetchError = {
          type: 'timeout',
          message: `Request timed out after ${config.timeout}ms`,
        };
      } else {
        fetchError = {
          type: 'network',
          message: error.message || 'Network error occurred',
        };
      }

      // If out of retries, return the error
      if (attempt === maxRetries) {
        return {
          success: false,
          error: fetchError,
        };
      }

      // Continue to retry using exponential backoff: 1s, 2s, 4s...
      const delay = Math.pow(2, attempt) * 1000;
      await sleep(delay);
      attempt++;
    }
  }

  // Fallback (should not be reached)
  return {
    success: false,
    error: {
      type: 'network',
      message: 'Unknown error occurred after retries',
    },
  };
}
