"use client";

import { useState } from "react";
import { useApiKeys } from "../hooks/useApiKeys";

export default function ApiKeyManager() {
    const { createApiKey, isLoading, isAuthenticated } = useApiKeys();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleCreateKey = async () => {
        if (!isAuthenticated) {
            setError("Please sign in first");
            return;
        }

        try {
            setError(null);
            const result = await createApiKey("My API Key");
            setSuccess("API key created successfully!");
            console.log(result);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to create API key"
            );
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-4">
            {error && (
                <div className="text-red-500 p-2 bg-red-50 rounded">
                    {error}
                </div>
            )}
            {success && (
                <div className="text-green-500 p-2 bg-green-50 rounded">
                    {success}
                </div>
            )}
            <button
                onClick={handleCreateKey}
                disabled={!isAuthenticated}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
                Create API Key
            </button>
        </div>
    );
}
