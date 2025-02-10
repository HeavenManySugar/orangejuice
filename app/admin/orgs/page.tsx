'use client';

import { useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
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
            {data && Array.isArray(data) && data.map((org: Organization) => (
                <div key={org.id} className="m-3 max-w-sm w-full lg:max-w-full lg:flex">
                    <Image
                        src={org.avatar_url}
                        alt={org.name}
                        width={100}
                        height={100}
                    />
                    <div className='ml-2'>
                        <h2><Link href={`/admin/orgs/${org.name}`} className="link-primary">{org.name}</Link></h2>
                        <p className="mt-2">{org.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}