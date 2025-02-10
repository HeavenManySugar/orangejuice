'use client';

import { useSession } from "next-auth/react"
import useSWR from 'swr'
import { Repository } from "@/components/ShowRepos/types";
import ShowRepos from "@/components/ShowRepos";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        accessTokenExpires?: number;
        refreshToken?: string;
        user?: {
            id?: number;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())

export default function Repos() {
    const { data: session } = useSession();

    const shouldFetch = !!session?.accessToken;

    const { data } = useSWR<Repository[]>(
        shouldFetch ? [
            '/api/v1/user/repos',
            {
                method: 'GET',
                headers: {
                    'Authorization': `token ${session?.accessToken}`
                }
            }
        ] : null,
        (args: [RequestInfo, RequestInit?]) => fetcher(...args)
    );

    return (
        <div className="mt-3 mx-auto max-w-7xl">
            <h1>Repository Page</h1>
            <ShowRepos data={data!} session={session!} />
        </div>
    );
}