import { fetchJsonWithRetry } from "./apiClient";

export interface BackendVideo {
    id: number;
    title: string;
    videoId: string;
    durationSeconds: number;
    moduleId: number;
    thumbnailUrl?: string;
}

export async function fetchBackendVideos(
    signal?: AbortSignal,
): Promise<BackendVideo[]> {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Authentication required. Please log in.");
    }

    return fetchJsonWithRetry<BackendVideo[]>(
        "/videos",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            signal,
        },
        2,
    );
}

export async function fetchPublicVideosByModule(
    moduleId: number,
    signal?: AbortSignal,
): Promise<BackendVideo[]> {
    if (!Number.isInteger(moduleId) || moduleId <= 0) {
        throw new Error("Invalid module ID.");
    }

    // This public request intentionally does not read localStorage and does not
    // attach an Authorization header.
    return fetchJsonWithRetry<BackendVideo[]>(
        `/videos/public/module/${moduleId}`,
        {
            method: "GET",
            signal,
        },
        8,
    );
}
