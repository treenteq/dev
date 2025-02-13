"use client";

import { SessionProvider } from "next-auth/react";
import ApiKeyManager from "@/components/ApiKeyManager";

export default function ApiKeysPage() {
    return (
        <SessionProvider>
            <main className="p-4">
                <h1 className="text-2xl font-bold mb-4">API Keys Management</h1>
                <ApiKeyManager />
            </main>
        </SessionProvider>
    );
}
