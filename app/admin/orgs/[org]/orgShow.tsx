'use client';

import { useSession } from "next-auth/react"
import useSWR from 'swr'
import { Repository } from "@/components/ShowRepos/types";
import ShowRepos from "@/components/ShowRepos";
import Link from "next/link";

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())

type OrgShowProps = {
    org: string;
};

export default function OrgShow({ org }: OrgShowProps) {
    const { data: session } = useSession();

    const shouldFetch = !!session?.accessToken;

    const { data } = useSWR<Repository[]>(
        shouldFetch ? [
            `/api/v1/orgs/${org}/repos`,
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
            <Link href={`/admin/orgs/${org}/members`} className="btn btn-primary">查看成員</Link>
            <ShowRepos data={data!} session={session!} isOrg={true} />
        </div>
    );
}