'use client';

import { useSession } from "next-auth/react"
import useSWR from 'swr'
import Reademe from '@/app/repos/[username]/[repo]/readme'
import { Repository } from '@/app/repos/[username]/[repo]/types'
import { GoRepo, GoRepoForked } from "react-icons/go";
import Link from "next/link";

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
        <div className="mt-3 mx-auto max-w-7xl">
            <h1 className="text-2xl font-bold flex items-center">
                {data && data.fork ? (
                    <GoRepoForked size={24} />
                ) : (
                    <GoRepo size={24} />
                )}
                <p className="ml-2">{username}/{repo}</p>
            </h1>
            {data && data.fork ? (
                <h3>fork自 <Link href={`/repos/${data.parent.full_name}`} className="link-primary">{data.parent.full_name}</Link></h3>
            ) : (
                null
            )}
            <Reademe username={username} repo={repo} />
        </div>
    );
}