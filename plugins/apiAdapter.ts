import type { NitroFetchOptions, NitroFetchRequest } from "nitropack";
import { ref } from "vue";
import { defineNuxtPlugin, useRuntimeConfig, type UseFetchOptions } from "#app";

interface ErrorResponse {
    message: string;
    status?: number;
    data?: unknown;
}

interface Error {
    message: string;
    response: ErrorResponse;
}

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const createFetch = (
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    ) => {
        const pending = ref(false);

        const handleResponse = async (
            url: string,
            fetchOptions:
                | UseFetchOptions<unknown>
                | NitroFetchOptions<NitroFetchRequest>,
        ) => {
            let response;
            let status;

            if (import.meta.server) {
                const { data, error } = await useFetch(
                    `${config.public.apiUrl + url}`,
                    {
                        ...fetchOptions,
                        onResponse({ response: res }) {
                            status = res.status;
                        },
                    },
                );
                if (error.value)
                    throw new Error(
                        error.value.message || "Что-то пошло не так",
                    );
                response = data.value;
            } else {
                const fetchResponse = await $fetch.raw(
                    `${config.public.apiUrl + url}`,
                    fetchOptions as NitroFetchOptions<NitroFetchRequest>,
                );
                response = fetchResponse._data;
                status = fetchResponse.status;
            }

            return { response, status };
        };

        const fetchMethod = async <T>(
            url: string,
            options: RequestInit = {},
        ): Promise<{
            data: T | null;
            status?: number;
            pending: boolean;
            error?: ErrorResponse | null;
        }> => {
            const fetchOptions:
                | UseFetchOptions<unknown>
                | NitroFetchOptions<NitroFetchRequest> = {
                method: method.toUpperCase() as
                    | "GET"
                    | "POST"
                    | "PUT"
                    | "PATCH"
                    | "DELETE",
                body: JSON.stringify(options),
            };

            pending.value = true;

            try {
                // Первичный запрос
                const { response, status } = await handleResponse(
                    url,
                    fetchOptions,
                );

                return { data: response as T, status, pending: pending.value };
            } catch (error: unknown) {
                const errorInfo = {
                    message: (error as Error).message || "Что-то пошло не так",
                    status: (error as Error).response?.status || undefined,
                    data: (error as Error).response?.data || null,
                };

                return {
                    data: null,
                    status: errorInfo.status,
                    pending: pending.value,
                    error: errorInfo,
                };
            } finally {
                pending.value = false;
            }
        };

        return fetchMethod; // Возвращаем метод
    };

    nuxtApp.provide("httpService", {
        get: createFetch("GET"),
        post: createFetch("POST"),
        put: createFetch("PUT"),
        patch: createFetch("PATCH"),
        delete: createFetch("DELETE"),
    });
});
