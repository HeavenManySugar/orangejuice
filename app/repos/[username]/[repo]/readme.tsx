'use client';

import { useSession } from "next-auth/react"
import useSWR from 'swr'
import MarkdownPreview from '@uiw/react-markdown-preview';
import { GoBook } from "react-icons/go";


const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.text())

export default function Readme({ username, repo }: { username: string, repo: string }) {
    const { data: session } = useSession();
    const shouldFetch = !!session?.accessToken;

    const { data } = useSWR(
        shouldFetch ? [
            `/api/v1/repos/${username}/${repo}/raw/README.md`,
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
        <div className="card bg-base-100 shadow-xl card-bordered my-5">
            <div className='card-title m-2'>
                <GoBook />
                <h2>README.md</h2>
            </div>
            <MarkdownPreview source={data} className="card-body card-bordered" />
        </div>
    )
}