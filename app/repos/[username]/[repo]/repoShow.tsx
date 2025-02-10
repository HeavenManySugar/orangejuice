'use client';

import { useSession } from "next-auth/react"
import useSWR from 'swr'
import Reademe from '@/app/repos/[username]/[repo]/readme'
import { Repository } from '@/app/repos/[username]/[repo]/types'

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())

type RepoShowProps = {
    username: string;
    repo: string;
};

export default function RepoShow({ username, repo }: RepoShowProps) {
    const { data: session } = useSession();

    const shouldFetch = !!session?.accessToken;

    const { data } = useSWR<Repository>(
        shouldFetch ? [
            `/api/v1/repos/${username}/${repo}`,
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
            {data?.name}
            <Reademe username={username} repo={repo} />
        </div>
    );
}