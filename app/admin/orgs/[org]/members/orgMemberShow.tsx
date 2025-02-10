'use client';

import { useSession } from "next-auth/react"
import useSWR from 'swr'
import { Repository } from "@/components/ShowRepos/types";
import Link from "next/link";

type User = {
    active: boolean;
    avatar_url: string;
    created: string;
    description: string;
    email: string;
    followers_count: number;
    following_count: number;
    full_name: string;
    html_url: string;
    id: number;
    is_admin: boolean;
    language: string;
    last_login: string;
    location: string;
    login: string;
    login_name: string;
    prohibit_login: boolean;
    restricted: boolean;
    source_id: number;
    starred_repos_count: number;
    visibility: string;
    website: string;
};

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())

type OrgMemberShowProps = {
    org: string;
};

export default function OrgMemberShow({ org }: OrgMemberShowProps) {
    const { data: session } = useSession();

    const shouldFetch = !!session?.accessToken;

    const { data } = useSWR<User[]>(
        shouldFetch ? [
            `/api/v1/orgs/${org}/members?limit=1000`,
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
            <h1>Org Members Page</h1>
            <div className="mb-4">
                <button onClick={() => window.history.back()} className="btn btn-secondary">
                    返回
                </button>
            </div>
            <div>
                {data && Array.isArray(data) && data.map((user: User) => (
                    <div key={user.id} className="card lg:card-side bg-base-100 shadow-xl my-2">
                        <div className="flex items-center my-3">
                            <div className="mx-4">
                                <figure>
                                    <img src={user.avatar_url} alt={user.login} className="rounded-full h-16 w-16" />
                                </figure>
                            </div>
                            <div className="card-body p-0">
                                <div className="flex items-center space-x-2">
                                    <Link href={user.html_url} className="card-title link-primary">
                                        {user.login}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}