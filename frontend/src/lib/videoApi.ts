export interface BackendVideo {
    id: number;
    title: string;
    videoId: string;
    durationSeconds: number;
    moduleId: number;
    thumbnailUrl?: string;
}

export const fetchBackendVideos = async (): Promise<BackendVideo[]> => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiUrl}/videos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            throw new Error("Authentication required. Please log in.");
        }
        throw new Error("Failed to fetch videos from the server.");
    }

    const data = await response.json();
    return data;
};