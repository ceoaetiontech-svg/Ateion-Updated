const DEFAULT_API_BASE_URL = "http://localhost:8080/api";
const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);

export class ApiRequestError extends Error {
    readonly status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = "ApiRequestError";
        this.status = status;
    }
}

export function getApiBaseUrl(): string {
    const configured = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
    const normalized = (configured || DEFAULT_API_BASE_URL).replace(/\/+$/, "");

    return normalized.toLowerCase().endsWith("/api")
        ? normalized
        : `${normalized}/api`;
}

function createApiUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${getApiBaseUrl()}${normalizedPath}`;
}

function wait(ms: number, signal?: AbortSignal | null): Promise<void> {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(new DOMException("The request was aborted.", "AbortError"));
            return;
        }

        const timer = window.setTimeout(() => {
            signal?.removeEventListener("abort", handleAbort);
            resolve();
        }, ms);

        const handleAbort = () => {
            window.clearTimeout(timer);
            signal?.removeEventListener("abort", handleAbort);
            reject(new DOMException("The request was aborted.", "AbortError"));
        };

        signal?.addEventListener("abort", handleAbort, { once: true });
    });
}

function extractErrorMessage(body: unknown, fallback: string): string {
    if (body && typeof body === "object" && "message" in body) {
        const message = (body as { message?: unknown }).message;
        if (typeof message === "string" && message.trim()) {
            return message;
        }
    }

    if (typeof body === "string" && body.trim()) {
        return body;
    }

    return fallback;
}

export async function fetchJsonWithRetry<T>(
    path: string,
    options: RequestInit = {},
    attempts = 3,
): Promise<T> {
    const url = createApiUrl(path);
    const totalAttempts = Math.max(1, attempts);
    let lastError: unknown;

    for (let attempt = 1; attempt <= totalAttempts; attempt += 1) {
        let response: Response;

        try {
            const headers = new Headers(options.headers);
            if (!headers.has("Accept")) {
                headers.set("Accept", "application/json");
            }

            response = await fetch(url, {
                ...options,
                headers,
            });
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                throw error;
            }

            lastError = error;
            if (attempt === totalAttempts) {
                throw new ApiRequestError("The server could not be reached. Please try again.");
            }

            await wait(1500 * attempt, options.signal);
            continue;
        }

        const rawBody = await response.text();
        let parsedBody: unknown = undefined;

        if (rawBody.trim()) {
            try {
                parsedBody = JSON.parse(rawBody);
            } catch {
                if (response.ok && attempt < totalAttempts) {
                    lastError = new ApiRequestError(
                        "The server returned a temporary non-JSON response while starting.",
                        response.status,
                    );
                    await wait(1500 * attempt, options.signal);
                    continue;
                }

                parsedBody = rawBody;
            }
        }

        if (!response.ok) {
            const error = new ApiRequestError(
                extractErrorMessage(
                    parsedBody,
                    `Request failed with status ${response.status}.`,
                ),
                response.status,
            );

            lastError = error;

            if (RETRYABLE_STATUS_CODES.has(response.status) && attempt < totalAttempts) {
                await wait(1500 * attempt, options.signal);
                continue;
            }

            throw error;
        }

        if (!rawBody.trim()) {
            return undefined as T;
        }

        if (typeof parsedBody === "string") {
            throw new ApiRequestError(
                "The server returned an unexpected response instead of JSON.",
                response.status,
            );
        }

        return parsedBody as T;
    }

    throw lastError instanceof Error
        ? lastError
        : new ApiRequestError("The request failed.");
}
