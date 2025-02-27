'use client';

import { useSession } from "next-auth/react"
import useSWR from 'swr'
import ansiHTML from 'ansi-html';

type ScoreData = {
    createdAt: string;
    deletedAt: {
        time: string;
        valid: boolean;
    };
    git_repo: string;
    id: number;
    message: string;
    score: number;
    updatedAt: string;
}

type Score = {
    message: string;
    success: boolean;
    data: ScoreData[];
}

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())

export default function Score({ username, repo }: { username: string, repo: string }) {
    const { data: session } = useSession();
    const shouldFetch = !!session?.accessToken;

    const { data } = useSWR<Score>(
        shouldFetch ? [
            `/api/score?owner=${username}&repo=${repo}&limit=1`,
            {
                method: 'GET',
                // headers: {
                //     'Authorization': `token ${session?.accessToken}`
                // }
            }
        ] : null,
        (args: [RequestInfo, RequestInit?]) => fetcher(...args)
    );

    return (
        <div className="card bg-base-100 shadow-xl card-bordered my-5">
            {data ? (
                <div className="card-body">
                    <h2 className="card-title">Score</h2>
                    <p className="whitespace-pre font-mono">{ansiHTML(data.data[0].message)}</p>
                </div>
            ) : (
                <div className="card-body">
                    <h2 className="card-title">Score</h2>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    )
}