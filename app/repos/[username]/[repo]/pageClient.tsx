'use client';

import { useSession } from "next-auth/react"
import useSWR from 'swr'
import Reademe from '@/app/repos/[username]/[repo]/readme'
import { Repository } from '@/app/repos/[username]/[repo]/types'
import { GoRepo, GoRepoForked } from "react-icons/go";
import Link from "next/link";
import Score from "./score";
import { useState } from "react";

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())

type RepoShowProps = {
    username: string;
    repo: string;
    tab: string;
};

export default function RepoShow({ username, repo, tab: defaultTab }: RepoShowProps) {
    const { data: session } = useSession();
    const [tab, setTab] = useState(defaultTab);

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
            <div role="tablist" className="tabs tabs-bordered whitespace-nowrap">
                <input type="radio" name="repoView" role="tab" className="tab" aria-label="Readme" defaultChecked={tab == 'readme'} onChange={() => setTab('readme')} />
                <div role="tabpanel" className="tab-content">
                    {tab === 'readme' && <Reademe username={username} repo={repo} />}
                </div>

                <input type="radio" name="repoView" role="tab" className="tab" aria-label="Score" defaultChecked={tab == 'score'} onChange={() => setTab('score')} />
                <div role="tabpanel" className="tab-content p-10">
                    {tab === 'score' && <Score username={username} repo={repo} />}
                </div>

                <input type="radio" name="repoView" role="tab" className="tab" aria-label="Tab 3" onChange={() => setTab('tab3')} />
                <div role="tabpanel" className="tab-content p-10">Tab content 3</div>
            </div>
        </div>
    );
}