'use client';

import { useSession } from "next-auth/react"
import useSWR from 'swr'

type Organization = {
    id: number;
    name: string;
    full_name: string;
    email: string;
    avatar_url: string;
    description: string;
    website: string;
    location: string;
    visibility: string;
    repo_admin_change_team_access: boolean;
    username: string;
}

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())

export default function Organizations() {
    const { data: session } = useSession();

    const shouldFetch = !!session?.accessToken;

    const { data } = useSWR<Organization[]>(
        shouldFetch ? [
            '/api/v1/admin/orgs',
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
        <div>
            <h1>Organizations Page</h1>
            {data && data.map((org: any) => (
                <div key={org.id}>
                    {org.name}
                </div>
            ))}
        </div>
    );
}