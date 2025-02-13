"use client";

import { useSession } from "next-auth/react";

export const useApiKeys = () => {
    const { data: session, status } = useSession();

    const createApiKey = async (name: string, expiresAt?: string) => {
        // Using optional chaining and providing a default error message
        if (!session?.user?.id) {
            throw new Error("Not authenticated");
        }

        const response = await fetch("http://localhost:3001/v1/api-keys", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.user.id}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                expiresAt,
                permissions: ["read"],
            }),
        });

        if (!response.ok) {
            const error = await response
                .json()
                .catch(() => ({ error: "Failed to create API key" }));
            throw new Error(error.error || "Failed to create API key");
        }

        return response.json();
    };

    return {
        createApiKey,
        isLoading: status === "loading",
        isAuthenticated: status === "authenticated" && !!session?.user?.id,
    };
};
